package main

import (
	"flag"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gocv.io/x/gocv"
)

func main() {
	hostport := flag.String("port", "8380", "port number")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run(*hostport)
}

// extractContour は、アップロードされた画像から輪郭を抽出する。
// パラメータは以下の3つ。
// 1. 画像ファイル
// 2. threshold1: int 型
// 3. threshold2: int 型
func extractContour(c *gin.Context) {
	// Extract contour from image
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get image file",
		})
		return
	}
	filename := file.Filename
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get image file",
		})
		return
	}

	// Read the image as grayscale
	img := gocv.IMRead(filename, gocv.IMReadGrayScale)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to read image file",
		})
		return
	}

	threshold1, err := strconv.Atoi(c.PostForm("threshold1"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get threshold1",
		})
		return
	}
	threshold2, err := strconv.Atoi(c.PostForm("threshold2"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get threshold2",
		})
		return
	}

	fmt.Printf("%v, %v", img, threshold1, threshold2)

	// Process the image and extract contour
	// $PLACEHOLDER$
}
