#!/bin/bash
# Abort on error
set -e

branch=$(git name-rev --name-only HEAD)

#branch=${1:-$current}

if [ "$branch" != "master" ] && [ "$branch" != "develop" ]; then
    echo "Deploying non-standard branch $branch, continue? (y/N)"
    read x
    if [ "$x" != "y" ] &&  [ "$x" != "Y" ]; then
        echo "stopping..."
        exit 0
    fi
fi

echo "Deploying $branch to gh-pages"

npm run deploy
git checkout gh-pages
git pull origin gh-pages
git rm ./app.*
mkdir tmp
cp -R ./dist/static/. ./tmp
git add ./tmp
git mv -f ./tmp/* ./
rm -rf tmp

set +e

GIT_STATUS=$(git status 2> /dev/null)
echo $GIT_STATUS | grep "nothing to commit" > /dev/null 2>&1
if [ "$?" -ne 0 ]
then
  now=$(date "+%d-%m-%Y %H:%M:%S")
  git commit -m "Updated website on: $now"
  git push origin gh-pages
fi
git checkout "$branch"
