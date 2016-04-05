#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os import listdir
from os.path import isfile, isdir, join
import sys

if len(sys.argv) == 1:
  print "Usage: python gallery_json.py targetFolderName"
  exit(-1)

dir = sys.argv[1]

if not isdir(dir):
  print "Directory " + dir + " does not exist"

import json

gallery_json = "../data/" + dir + ".json"

images = [f for f in listdir(dir) if isfile(join(dir, f)) and f.endswith(".jpg")]

data = json.load(open(gallery_json, "rb"))

for image in images:
    if all(entry["img"] != image for entry in data):
        data.append({"img": image, "descr": ""})

for i, entry in enumerate(data):
    if entry["img"] not in images:
        del data[i]

json.dump(data, open(gallery_json, "wb"), sort_keys=True, indent=4)
