# -*- coding: utf-8 -*-

import os

MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', '')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')
MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'oldhawaii')
DEBUG = True
SOFT_DELETE = True


RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

X_DOMAINS = "*"

digital_assets = {
    'item_title': 'digital_assets',
    'schema': {
        'type': {
            'type': 'string',
            'allowed': ['image', 'audio']
        },
        'source_organization': {'type': 'objectid'},
        'title': {'type': 'string'},
        'description': {'type': 'string'},
        'author': {'type': 'string'},
        'published_date': {'type': 'datetime'},
        'image_url': {'type': 'string'},
        'image_width': {'type': 'integer'},
        'image_height': {'type': 'integer'},
        'thumbnail_url': {'type': 'string'},
        'thumbnail_width': {'type': 'integer'},
        'thumbnail_height': {'type': 'integer'},
        'audio_url': {'type': 'string'},
        'audio_length': {'type': 'integer'},
        'latitude': {'type': 'number'},
        'longitude': {'type': 'number'},
        'created_at': {'type': 'datetime'},
        'created_by': {'type': 'string'},
        'updated_at': {'type': 'datetime'},
        'updated_by': {'type': 'string'}
    }
}

sources = {
    'item_title': 'sources',
    'schema': {
        'name': {'type': 'string'},
        'url': {'type': 'string'},
        'email': {'type': 'string'},
        'phone_number': {'type': 'string'},
        'created_at': {'type': 'datetime'},
        'created_by': {'type': 'string'},
        'updated_at': {'type': 'datetime'},
        'updated_by': {'type': 'string'}
    }
}

DOMAIN = {
    'digital_assets': digital_assets,
    'sources': sources
}

# vim: filetype=python
