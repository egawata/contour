#!/bin/sh

set -ex

cd frontend
npm install
npm run build
cd ../backend
go build -o app .
