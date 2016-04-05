#!/bin/bash

shopt -s nullglob

if [ -z $1 ]; then 
  echo "Usage: ./resize targetFolderName"
  exit -1
fi

dir="$1"

if [ ! -d $dir ]; then
  echo "Directory $dir not found"
  exit -1
fi

# Convert png to jpeg
for f in $dir/*.png; do
	convert $f -resize 1920 -quality 80 "$dir/`basename $f .png`.jpg"
	rm $f
done

# Rename .jpeg to .jpg
for f in $dir/*.jpeg; do
	mv $f "$dir/`basename $f .jpeg`.jpg"
done

# Convert too large jpeg's
for f in $dir/*.jpg; do
	convert $f -resize '1920x1080>' -quality 80 $f
done
