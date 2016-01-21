#!/bin/bash
npm run deploy
git checkout gh-pages
git pull origin gh-pages
git rm ./app.*
cp dist/static/app.* ./
cp dist/static/index.html ./
cp dist/static/logo.svg ./
git add ./app.* ./index.html ./*.svg
GIT_STATUS=$(git status 2> /dev/null)
echo $GIT_STATUS | grep "nothing to commit" > /dev/null 2>&1
if [ "$?" -ne 0 ]
then
  now=$(date "+%d-%m-%Y %H:%M:%S")
  git commit -m "Updated website on: $now"
  git push origin gh-pages
fi
git checkout master
