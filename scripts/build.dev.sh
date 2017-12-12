#!/usr/bin/env bash

rm -rf ./dist
mkdir -p ./dist/assets
npm run build:sw
./node_modules/.bin/webpack