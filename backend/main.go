package main

import (
	"fmt"
	"image"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/egawata/contour/backend/message"
	"github.com/gorilla/websocket"
	"gocv.io/x/gocv"
	"google.golang.org/protobuf/proto"
)

const (
	defaultPort    = 8080
	defaultAppRoot = "/"
	frontDir       = "frontend"
)

// start http server at port 8080
func main() {
	port := defaultPort
	appRoot := defaultAppRoot

	if p := os.Getenv("APP_PORT"); p != "" {
		var err error
		port, err = strconv.Atoi(p)
		if err != nil {
			log.Fatalf("invalid PORT : %s : %v", p, err)
		}
	}
	if p := os.Getenv("APP_PATH"); p != "" {
		if p[0] != '/' {
			log.Fatalf("path must start with / : %s", p)
		}
		if len(p) > 1 && p[len(p)-1] != '/' {
			p += "/"
		}
		appRoot = p
	}

	mux := http.NewServeMux()
	mux.HandleFunc(appRoot+"convert", convertHandler)
	mux.Handle(appRoot, &rootHandler{appRoot: appRoot})

	log.Printf("Server started at http://localhost:%d%s", port, appRoot)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), mux); err != nil {
		log.Fatal(err)
	}
}

type rootHandler struct {
	appRoot string
}

func (h *rootHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	upath := r.URL.Path
	if !strings.HasPrefix(upath, h.appRoot) {
		http.NotFound(w, r)
		return
	}
	path := fmt.Sprintf("%s/%s", frontDir, strings.TrimPrefix(upath, h.appRoot))
	http.ServeFile(w, r, path)
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
