#!/bin/bash

packagePath="./dist/lib/*"
destPath="./node_modules/@sat/attached-overlay"

# create directory and copy build artifacts
rm -rf $destPath
mkdir -p $destPath
cp -R $packagePath $destPath

echo "Copied library to node_modules"
