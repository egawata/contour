FROM alpine:3.20.2

RUN apk update
RUN apk add go npm opencv-dev
RUN apk add gcc g++

COPY backend /backend
COPY frontend /frontend

WORKDIR /frontend
RUN /usr/bin/npm install
RUN /usr/bin/npm run build
RUN mv build /backend/frontend

WORKDIR /backend
RUN /usr/bin/go build -o /app .

EXPOSE 8080

CMD ["/app"]
