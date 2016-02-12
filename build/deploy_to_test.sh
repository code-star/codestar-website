#!/bin/bash
# Abort on error
set -e

if ! [ -f "README.md" ]; then
    echo "Run from repository root"
    exit -1
fi

branch=$(git name-rev --name-only HEAD)

if [ "$branch" != "master" ] && [ "$branch" != "develop" ]; then
    echo "Deploying non-standard branch $branch, continue? (y/N)"
    read x
    if [ "$x" != "y" ] &&  [ "$x" != "Y" ]; then
        echo "stopping..."
        exit 0
    fi
fi

echo "Deploying $branch to gh-pages"

# Make the site files and check them in on the gh-pages branch

npm run deploy
git checkout gh-pages
git pull origin gh-pages
#git rm ./app.*

# We move the dist to a temp folder because the files in the github page repo are all in root
# and we do not want to pollute our own root
# Copy all dist files to a temp folder
mkdir tmp
cp -R ./dist/static/. ./tmp
# Add the temp folder to git
git add ./tmp
# Move all the files 1 dir up in git
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
