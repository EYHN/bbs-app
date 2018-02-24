# /usr/bin/env python3

from io import BytesIO
from PIL import Image
import base64
import sys

def make_thumb_base64(image):
  im = image.copy()
  mode = im.mode
  if mode not in ('L', 'RGB'):
    if mode == 'RGBA':
      im.load()
      alpha = im.split()[3]
      bgmask = alpha.point(lambda x: 255-x)
      im = im.convert('RGB')
      im.paste((255,255,255), None, bgmask)
    else:
      im = im.convert('RGB')

  width, height = im.size

  if width > height:
    r = width / height
    width = min(width, 50)
    height = round(width / r)
  else:
    r = width / height
    height = min(height, 50)
    width = round(height * r)

  thumb = im.resize((width, height), Image.ANTIALIAS)

  byte_io = BytesIO()

  thumb.save(byte_io, 'JPEG')

  return base64.b64encode(byte_io.getvalue()).decode('utf-8')

if __name__ == '__main__':
  print(make_thumb_base64(Image.open(sys.argv[1])))