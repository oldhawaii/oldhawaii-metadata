# -*- coding: utf-8 -*-

import os

MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', '')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')
MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'oldhawaii')
DEBUG = True


RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

X_DOMAINS = "*"

metadatas = {
    'item_title': 'metadatas',

    'schema': {
        'type': {'type': 'string'},
        'source_name': {'type': 'string'},
        'source_url': {'type': 'string'},
        'title': {'type': 'string'},
        'description': {'type': 'string'},
        'author': {'type': 'string'},
        'published_date': {'type': 'datetime'},
        'image_url': {'type': 'string'},
        'image_width': {'type': 'int'},
        'image_height': {'type': 'int'},
        'thumbnail_url': {'type': 'string'},
        'thumbnail_width': {'type': 'int'},
        'thumbnail_height': {'type': 'int'},
        'audio_url': {'type': 'string'},
        'audio_length': {'type': 'int'},
        'latitude': {'type': 'string'},
        'longitude': {'type': 'string'}
    }
}

DOMAIN = {
    'metadatas': metadatas
}
