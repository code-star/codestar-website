#!/bin/bash
# Abort on error
set -e

PRODUCTION_REPO="git@github.com:code-star/code-star.github.io.git"
PRODUCTION_DIRNAME="build/production_repo"

pwd=$(pwd)

if ! [ -f "package.json" ]; then
    echo "Run from repository root"
    exit -1
fi

# Save branch and checkout master
branch=$(git name-rev --name-only HEAD)
git checkout master

echo "Deploying master branch to production"

# Make the site files
npm run deploy

# cd into the production repo
# Clone the production repository if it doesn't exist
if ! [ -d "$PRODUCTION_DIRNAME" ]; then
    git clone "$PRODUCTION_REPO" "$PRODUCTION_DIRNAME"
fi

cd "$PRODUCTION_DIRNAME"

git pull
# Remove old compiled app files
git rm -r .
# Copy new files
cp -R "$pwd/dist/static/." .
echo "www.codestar.nl" > CNAME
git add .

# Create commit
now=$(date "+%d-%m-%Y %H:%M:%S")
git commit -m "Updated website on: $now"

# Push to production
git push

# Cleanup
# Go back to original repo
cd "$pwd"
# Checkout original branch
git checkout "$branch"