#!/bin/bash

npx protoc \
  --plugin="protoc-gen-ts_proto=node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="src" \
  --ts_proto_opt=outputEncodeMethods=true,outputJsonMethods=true,outputClientImpl=false \
  message.proto