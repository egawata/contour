## Building hybrid Docker image

To build a Docker image for amd64 and arm64,

### Build Docker images in each environments

#### for arm64

~~~sh
docker build -t egawata/contour:${VERSION}-arm64 .
docker push egawata/contour:${VERSION}-arm64 
~~~

#### for amd64

~~~sh
docker build -t egawata/contour:${VERSION}-arm64 .
docker push egawata/contour:${VERSION}-amd64 
~~~

### Merge both images

Given you're using arm64 environment:

#### Pull another image

~~~sh
docker pull egawata/contour:${VERSION}-amd64 
docker images | grep egawata/contour
~~~

Confirm both images (amd64/arm64) exist.

#### Create hybrid image

~~~sh
docker manifest create \
    egawata/contour:${VERSION} \
    egawata/contour:${VERSION}-amd64 \
    egawata/contour:${VERSION}-arm64
docker manifest inspect egawata/contour:${VERSION}
~~~

#### Push the image

~~~sh
docker manifest push egawata/contour:${VERSION}
~~~
