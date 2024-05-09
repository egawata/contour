import { useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';

// aa
export const App = () => {
  var [inputImage, setInputImage] = useState('')

  const handleReadFile = async () => {
      const filePath = await (window as any).electronAPI.openFile()
      setInputImage(filePath)
  }

  return (
    <div className="container">
        <InputImage src={inputImage} />
        <OutputImage src="./images/output.jpg" />
        <input type="text" name="threshold1" value="100" />
        <input type="text" name="threshold2" value="200" />
        <button type="button" onClick={handleReadFile}>Read File</button>
        file path: <strong id="filePath"></strong>
        <button>Generate</button>
        <button>Export</button>
        <Helmet>
          <script src='./renderer.js'></script>
        </Helmet>
    </div>
  );
};

interface InputImageProps {
  src: string;
}

const InputImage: React.FC<InputImageProps> = ({ src }) => {
  return (
    src === '' ? <div>input image</div> : <img src={src} width="300" alt="input" />
  );
};

interface outputImageProps {
  src: string;
}

const OutputImage: React.FC<outputImageProps> = ({ src }) => {
  return (
    src === '' ? <div>output image</div> : <img src={src} width="300" alt="output" />
  );
};