# /usr/bin/env python3

from image_thumb_base64 import make_thumb_base64
from colorthief import ColorThief
from PIL import Image
import json
import sys
import os

def make_resource_json(path):
  im = Image.open(path)
  thumb_base64 = make_thumb_base64(im)
  width, height = im.size
  filesize = os.stat(path).st_size
  dominant_color = ColorThief(path).get_color(quality=1)
  return json.dumps(
    {
      'type': 'image',
      'src': os.path.join('/', os.path.relpath(path, os.path.abspath(os.path.join(__file__, '../../server')))),
      'thumb': 'data:image/jpeg;base64,' + thumb_base64,
      'width': width,
      'height': height,
      'size': filesize,
      'dominantColor': '#%02x%02x%02x' % dominant_color
    }
  )

if __name__ == '__main__':
  print(make_resource_json(sys.argv[1]))