package main

import (
	"embed"
	"fmt"
	"image"
	"io/fs"
	"log"
	"net/http"

	"github.com/egawata/contour/backend/message"
	"github.com/gorilla/websocket"
	"gocv.io/x/gocv"
	"google.golang.org/protobuf/proto"
)

//go:embed frontend
var frontend embed.FS

const port = 8080

// start http server at port 8080
func main() {
	http.HandleFunc("/convert", convertHandler)
	frontFS, err := fs.Sub(frontend, "frontend")
	if err != nil {
		log.Fatal(err)
	}
	http.Handle("/", http.FileServer(http.FS(frontFS)))

	log.Printf("Server started at http://localhost:%d", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		log.Fatal(err)
	}
}

func convertHandler(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}

		if messageType == websocket.BinaryMessage {
			var req message.GetContourRequest
			if err := proto.Unmarshal(p, &req); err != nil {
				log.Println(err)
				continue
			}
			inImage := req.GetInImage()
			log.Printf("req: t1: %d, t2: %d, infile len = %d",
				req.GetT1(), req.GetT2(), len(inImage))

			outImage, err := getContour(float32(req.GetT1()), float32(req.GetT2()), inImage)
			if err != nil {
				log.Println(err)
				continue
			}

			res := &message.GetContourResponse{
				Success:  true,
				OutImage: outImage,
			}
			resBytes, err := proto.Marshal(res)
			if err != nil {
				log.Println(err)
				continue
			}
			log.Printf("res.success: %v", res.GetSuccess())
			log.Printf("len of res: %v", len(resBytes))
			if err := conn.WriteMessage(websocket.BinaryMessage, resBytes); err != nil {
				log.Println(err)
				continue
			}
		}
	}
}

func getContour(t1, t2 float32, inImage []byte) ([]byte, error) {
	img, err := gocv.IMDecode(inImage, gocv.IMReadGrayScale)
	if err != nil {
		return nil, err
	}
	defer img.Close()

	blurred := gocv.NewMat()
	defer blurred.Close()

	gocv.GaussianBlur(img, &blurred, image.Point{X: 5, Y: 5}, 0, 0, gocv.BorderDefault)

	cannied := gocv.NewMat()
	gocv.Canny(blurred, &cannied, t1, t2)

	gocv.BitwiseNot(cannied, &cannied)

	res, err := gocv.IMEncode(".png", cannied)
	if err != nil {
		return nil, err
	}
	return res.GetBytes(), nil
}
