# Contour detection

## Description

This tool extracts contour from image and output the result.

## Usage

~~~sh
go install github.com/egawata/contour
contour -i input.jpg -o output.png
~~~

- `-i`: input image
- `-o`: output image
- `-t1` `-t2`: threshold. Default = `t1: 100` `t2: 200`

## Sample

~~~
contour -i sample/input.jpg -o sample/output.jpg -t1 50 -t2 150
~~~

