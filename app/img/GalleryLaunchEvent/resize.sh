#!/bin/bash

shopt -s nullglob

# Convert png to jpeg
for f in *.png; do
	convert $f -resize 1920 -quality 80 "`basename $f .png`.jpg"
	rm $f
done

# Rename .jpeg to .jpg
for f in *.jpeg; do
	mv $f "`basename $f .jpeg`.jpg"
done

# Convert too large jpeg's
for f in *.jpg; do
	convert $f -resize '1920x1080>' -quality 80 $f
done
