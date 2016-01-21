#!/bin/bash
npm run deploy
git checkout gh-pages
git pull origin gh-pages
git rm ./app.*
mkdir tmp
cp -R ./dist/static/. ./tmp
git add ./tmp
git mv -f ./tmp/* ./
rm -rf tmp
GIT_STATUS=$(git status 2> /dev/null)
echo $GIT_STATUS | grep "nothing to commit" > /dev/null 2>&1
if [ "$?" -ne 0 ]
then
  now=$(date "+%d-%m-%Y %H:%M:%S")
  git commit -m "Updated website on: $now"
  git push origin gh-pages
fi
git checkout master
