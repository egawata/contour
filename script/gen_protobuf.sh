#!/bin/sh

# This script generates the protobuf files for both the frontend and backend.
# Run this script when message.proto is updated.

set -e

echo Generating protobuf file for frontend...
cp message.proto frontend/
cd frontend
script/gen_protobuf.sh
rm message.proto


echo Generating protobuf file for backend...
cd ..
cp message.proto backend/
cd backend
script/build_protoc.sh
rm message.proto

echo Done.
