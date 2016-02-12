#!/bin/bash
# Abort on error
set -e

PRODUCTION_REPO="git@github.com:OrdinaNederland/OrdinaNederland.github.io.git"
PRODUCTION_DIRNAME="build/production_repo"

pwd=$(pwd)

if ! [ -f "README.md" ]; then
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

# Remove old compiled app files
git rm *
# Copy new files
cp -R ./dist/static/. .
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