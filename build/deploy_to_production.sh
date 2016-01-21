#!/bin/bash
npm run deploy
git checkout gh-pages
git pull
git rm ./app.*
cp dist/static/app.* ./
cp dist/static/index.html ./
git add ./app.* ./index.html
now=$(date "+%d-%m-%Y %H:%M:%S")
git commit -m "Updated website on: $now"
git push origin gh-pages
git checkout master
