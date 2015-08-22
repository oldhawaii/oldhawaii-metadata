#!/usr/bin/env python
# -*- coding: utf-8 -*-

import imghdr
import requests
import StringIO
import struct


# http://stackoverflow.com/a/20380514
def get_image_size(image_fhandle):
    img_bytes = image_fhandle.getvalue()
    img_header = image_fhandle.read(24)
    if len(img_header) != 24:
        return None, None
    if imghdr.what(None, img_bytes) == 'png':
        check = struct.unpack('>i', img_header[4:8])[0]
        if check != 0x0d0a1a0a:
            return None, None
        width, height = struct.unpack('>ii', img_header[16:24])
    elif imghdr.what(None, img_bytes) == 'gif':
        width, height = struct.unpack('<HH', img_header[6:10])
    elif imghdr.what(None, img_bytes) == 'jpeg':
        try:
            image_fhandle.seek(0)
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf:
                image_fhandle.seek(size, 1)
                byte = image_fhandle.read(1)
                while ord(byte) == 0xff:
                    byte = image_fhandle.read(1)
                ftype = ord(byte)
                size = struct.unpack('>H', image_fhandle.read(2))[0] - 2
            image_fhandle.seek(1, 1)
            width, height = struct.unpack('>HH', image_fhandle.read(4))
        except Exception as e:
            return None, None
    else:
        return None, None
    return width, height


def get_image_size_from_url(url):
    f = StringIO.StringIO()
    try:
        response = requests.get(url)
        f.write(response.content)
        f.seek(0)
        width, height = get_image_size(f)
    except Exception as e:
        width, height = None, None
    finally:
        f.close()
    return width, height

# vim: filetype=python
