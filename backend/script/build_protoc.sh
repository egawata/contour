#!/bin/bash

set -e

protoc --go_out=./message --go_opt=paths=source_relative message.proto

