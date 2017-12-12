#!/usr/bin/env bash

rm -rf ./dist
mkdir -p ./dist/assets
npm run build:sw
NODE_ENV=production ./node_modules/.bin/webpack