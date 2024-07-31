FROM alpine:3.20.2

RUN apk update
RUN apk add --no-cache go npm opencv-dev
RUN apk add --no-cache gcc g++

COPY backend /backend
COPY frontend /frontend

WORKDIR /frontend
RUN /usr/bin/npm install
RUN /usr/bin/npm run build
RUN rm -rf /backend/frontend
RUN mv build /backend/frontend

WORKDIR /backend
RUN /usr/bin/go build -o /app .

FROM alpine:3.20.2
COPY --from=0 /app /app

RUN apk update
RUN apk add --no-cache opencv-dev

EXPOSE 8080
CMD ["/app"]
