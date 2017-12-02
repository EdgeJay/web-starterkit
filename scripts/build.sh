#!/usr/bin/env bash

rm -rf ./dist
mkdir -p ./dist/assets
cp ./src/client/assets/index.html ./dist
npm run build:sw
NODE_ENV=production ./node_modules/.bin/webpack