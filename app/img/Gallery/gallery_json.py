#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os import listdir
from os.path import isfile, join

import json

gallery_json = "../../data/gallery.json"

images = [f for f in listdir(".") if isfile(join(".", f)) and f.endswith(".jpg")]

data = json.load(open(gallery_json, "rb"))

for image in images:
    if all(entry["img"] != image for entry in data):
        data.append({"img": image, "descr": ""})

for i, entry in enumerate(data):
    if entry["img"] not in images:
        del data[i]

json.dump(data, open(gallery_json, "wb"), sort_keys=True, indent=4)