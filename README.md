# Contour detection

[日本語ドキュメント](./README.md)

## Description

This tool extracts contour from image and output the result.

<img src="sample/webapp.png" width="400">

## CLI

To build from source, Go and [OpenCV](https://opencv.org/) library is required.

~~~sh
go install github.com/egawata/contour
contour -i input.jpg -o output.png
~~~

- `-i`: input image
- `-o`: output image
- `-t1` `-t2`: threshold. Default = `t1: 100` `t2: 200`

## Web Application

### Pull Docker image

[Docker image](https://hub.docker.com/r/egawata/contour/tags)

### Or build Docker image manually

~~~sh
docker build -t egawata/contour .
docker run -p 8080:8080 egawata/contour
~~~

Then open `http://localhost:8080` on your browser.

### Build from source

To build from source, Go, npm and [OpenCV](https://opencv.org/) library is required.
After prepared, run the following.

~~~sh
script/build.sh
~~~

Then, run the app and open `http://localhost:8080` from your browser.

~~~sh
cd backend
./app
~~~

## Sample

~~~
contour -i sample/input.jpg -o sample/output.jpg -t1 50 -t2 150
~~~

Input image

<img src="sample/input.jpg" width="300" />

Output image

<img src="sample/output.jpg" width="300" />

## License

Licensed under the Apache 2.0 license. Copyright (c) 2024 by egawata
