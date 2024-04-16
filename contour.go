package main

import (
	"flag"
	"image"
	"log"

	"gocv.io/x/gocv"
)

var (
	in  string
	out string
)

func main() {
	// オプション変数を受け取る。-o で出力ファイルを指定、-i で入力ファイルを指定
	flag.StringVar(&in, "i", "", "input filename")
	flag.StringVar(&out, "o", "", "output filename")
	flag.Parse()

	if in == "" || out == "" {
		log.Fatal("usage: contour -i <input filename> -o <output filename>")
	}

	img := gocv.IMRead(in, gocv.IMReadGrayScale)
	if img.Empty() {
		log.Fatalf("Failed to open file %s\n", in)
	}
	defer img.Close()
	blurred := gocv.NewMat()
	defer blurred.Close()

	gocv.GaussianBlur(img, &blurred, image.Point{X: 5, Y: 5}, 0, 0, gocv.BorderDefault)

	cannied := gocv.NewMat()
	gocv.Canny(blurred, &cannied, 100, 200)

	gocv.BitwiseNot(cannied, &cannied)

	gocv.IMWrite(out, cannied)
}
