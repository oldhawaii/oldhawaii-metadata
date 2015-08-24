# -*- coding: utf-8 -*-

import os

MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', '')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')
MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'oldhawaii')
DEBUG = True
SOFT_DELETE = True
IF_MATCH = False

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
        'source_organization': {
            'type': 'objectid',
            'nullable': True
        },
        'title': {
            'type': 'string',
            'nullable': True
        },
        'description': {
            'type': 'string',
            'nullable': True
        },
        'author': {
            'type': 'string',
            'nullable': True
        },
        'published_date': {
            'type': 'datetime',
            'nullable': True
        },
        'image_url': {
            'type': 'string',
            'nullable': True
        },
        'image_width': {
            'type': 'integer',
            'nullable': True
        },
        'image_height': {
            'type': 'integer',
            'nullable': True
        },
        'thumbnail_url': {
            'type': 'string',
            'nullable': True
        },
        'thumbnail_width': {
            'type': 'integer',
            'nullable': True
        },
        'thumbnail_height': {
            'type': 'integer',
            'nullable': True
        },
        'audio_url': {
            'type': 'string',
            'nullable': True
        },
        'audio_length': {
            'type': 'integer',
            'nullable': True
        },
        'latitude': {
            'type': 'number',
            'nullable': True
        },
        'longitude': {
            'type': 'number',
            'nullable': True
        },
        'created_at': {
            'type': 'datetime',
            'nullable': True
        },
        'created_by': {
            'type': 'string',
            'nullable': True
        },
        'updated_at': {
            'type': 'datetime',
            'nullable': True
        },
        'updated_by': {
            'type': 'string',
            'nullable': True
        }
    }
}

sources = {
    'item_title': 'sources',
    'schema': {
        'name': {
            'type': 'string',
            'required': True
        },
        'url': {
            'type': 'string',
            'nullable': True
        },
        'email': {
            'type': 'string',
            'nullable': True
        },
        'phone_number': {
            'type': 'string',
            'nullable': True
        },
        'created_at': {
            'type': 'datetime',
            'nullable': True
        },
        'created_by': {
            'type': 'string',
            'nullable': True
        },
        'updated_at': {
            'type': 'datetime',
            'nullable': True
        },
        'updated_by': {
            'type': 'string',
            'nullable': True
        }
    }
}

DOMAIN = {
    'digital_assets': digital_assets,
    'sources': sources
}

# vim: filetype=python
