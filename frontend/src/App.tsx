import React, { useState } from 'react';
import './App.css';
import ThresholdInput from './ThresholdInput'
import { GetContourRequest, GetContourResponse } from './message'

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            resolve(arrayBuffer);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file)
    });
}

const App: React.FC = () => {
    const [threshold1, setThreshold1] = useState(50)
    const [threshold2, setThreshold2] = useState(150)
    const [inputFile, setInputFile] = useState(null)
    const [imageURL, setImageURL] = useState("")
    const [resultImageURL, setResultImageURL] = useState("")
    const [resultImageBlob, setResultImageBlob] = useState<Blob|null>(null)

    const handleFileChange = (event: any) => {
        const f = event.target.files[0]
        readFile(f)
        setInputFile(f)
    }

    const readFile = (file: Blob) => {
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event: any) => {
            const imageData = event.target.result
            if (imageData !== null && typeof(imageData) === "string") {
                setImageURL(imageData)
            }
        }
        reader.onerror = (error) => {
            console.error("error" + error)
        }
        reader.readAsDataURL(file)
    }

    const sendRequest = async () => {
        if (!inputFile) {
            console.log("No file selected")
            return
        }

        var arrayBuffer: ArrayBuffer
        try {
            arrayBuffer = await readFileAsArrayBuffer(inputFile as File)
        } catch (error) {
            console.error("Error: " + error)
            return
        }

        const request = GetContourRequest.create({
            t1: 75,
            t2: 150,
            filename: 'test.jpg',
            inImage: new Uint8Array(arrayBuffer),
        })

        const encodedReq = GetContourRequest.encode(request).finish()

        const ws = new WebSocket('ws://localhost:8080/contour/get')
        ws.binaryType = "arraybuffer"

        ws.onmessage = async (event: any) => {
            var data = event.data
            const uint8data = new Uint8Array(data)
            const res = GetContourResponse.decode(uint8data)
            if (res.success) {
                console.log("success")
                const blob = new Blob([res.outImage], { type: "image/png" })
                const url = URL.createObjectURL(blob)
                setResultImageURL(url)
                setResultImageBlob(blob)
            } else {
                console.log("request failure")
            }
        }

        ws.onerror = (event) => {
            console.error(event)
        }
        ws.onopen = () => {
            ws.send(encodedReq)
        }
    }

    const handleDownloadResult = () => {
        if (resultImageBlob) {
            const url = URL.createObjectURL(resultImageBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = "contour_result.png"
            a.click()
        }
    }

    return (
        <div className="App">
            <div>
                <label>Input image file: </label>
                <input type="file" id="infile" accept="image/*" onChange={handleFileChange} />
            </div>
            <ThresholdInput label="Threshold 1: " val={threshold1} onChange={(v) => setThreshold1(v)} />
            <ThresholdInput label="Threshold 2: " val={threshold2} onChange={(v) => setThreshold2(v)} />
            <div>
                <button id="send" onClick={sendRequest}>Send</button>
            </div>
            {imageURL && (
                <div>
                    <img src={imageURL} alt="Selected Image" width="400px" />
                </div>
            )}
            {resultImageURL && (
                <div>
                    <img src={resultImageURL} alt="Result Image" width="400px" />
                </div>
            )}
            {resultImageBlob && (
                <div>
                    <button onClick={handleDownloadResult}>Download Result</button>
                </div>
            )}
        </div>
    );
}

export default App;
