#
# build backend
#

FROM ghcr.io/hybridgroup/opencv:4.9.0 AS backend

ENV GOPATH=/go

COPY backend /backend

WORKDIR /backend
RUN go build -o /app .

#
# build frontend
#

FROM node:22.7.0 AS frontend

COPY frontend /frontend

WORKDIR /frontend
RUN npm install
RUN npm run build

#
# build final image
#

FROM alpine:3.20.3

COPY --from=backend /app /app
COPY --from=frontend /frontend/build /frontend

RUN apk update && apk add \
libopencv_highgui \
libopencv_videoio \
libopencv_video \
libopencv_objdetect \
libopencv_calib3d \
libopencv_imgcodecs \
libopencv_features2d \
libopencv_dnn \
libopencv_photo \
libopencv_imgproc \
libopencv_core \
libstdc++ \
libgcc \
libc6-compat

WORKDIR /
EXPOSE 8080
CMD ["/app"]
