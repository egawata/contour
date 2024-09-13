#!/bin/sh

set -ex

script/build_front.sh
cd /backend
go build -o app .
cd ..
