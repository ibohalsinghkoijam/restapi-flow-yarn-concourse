#!/bin/sh
set -e

cd repo-basic/

rm -rf node_modules yarn.lock
yarn install
npm run test