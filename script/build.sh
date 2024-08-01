#!/bin/sh

set -ex

cd frontend
npm run build
cd ../backend
go build -o app .
