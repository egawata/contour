#!/bin/sh

set -ex

script/build_front.sh
pushd backend
go build -o app .
popd
