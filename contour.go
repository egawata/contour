package main

import (
	"flag"
	"image"
	"log"

	"gocv.io/x/gocv"
)

var (
	in     string
	out    string
	t1, t2 float64 // threshold
)

func main() {
	flag.StringVar(&in, "i", "", "input filename")
	flag.StringVar(&out, "o", "", "output filename")
	flag.Float64Var(&t1, "t1", 100, "threshold1")
	flag.Float64Var(&t2, "t2", 200, "threshold2")
	flag.Parse()

	if in == "" || out == "" {
		log.Fatal("usage: contour -i <input filename> -o <output filename> [-t1 <threshold1>] [-t2 <threshold2>]")
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
	gocv.Canny(blurred, &cannied, float32(t1), float32(t2))

	gocv.BitwiseNot(cannied, &cannied)

	gocv.IMWrite(out, cannied)
	log.Printf("image saved to %s\n", out)
}
