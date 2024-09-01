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

FROM ghcr.io/hybridgroup/opencv:4.9.0


COPY --from=backend /app /app
COPY --from=frontend /frontend/build /frontend

WORKDIR /
EXPOSE 8080
CMD ["/app"]
