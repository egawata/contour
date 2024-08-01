FROM alpine:3.20.2

RUN apk update
RUN apk add --no-cache go npm opencv-dev
RUN apk add --no-cache gcc g++

COPY backend /backend
COPY frontend /frontend

WORKDIR /frontend
RUN /usr/bin/npm install
RUN /usr/bin/npm run build

WORKDIR /backend
RUN /usr/bin/go build -o /app .

FROM alpine:3.20.2
COPY --from=0 /app /app
COPY --from=0 /frontend/build /frontend

RUN apk update
RUN apk add --no-cache opencv-dev

EXPOSE 8080
CMD ["/app"]
