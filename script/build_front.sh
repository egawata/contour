#!/bin/sh

set -ex

pushd frontend
npm install
npm run build
popd
