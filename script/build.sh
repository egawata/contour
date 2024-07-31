#!/bin/sh

set -ex

mkdir -p bin
cd frontend
npm run build
rm -rf ../backend/frontend
cp -R build ../backend/frontend
cd ../backend
go build -o ./bin/app .
