#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from os import environ as env
from oldhawaii_metadata.apps.api import metadata_api
from oldhawaii_metadata.apps.metadatas import metadatas
from oldhawaii_metadata.apps.www import www
from oldhawaii_metadata.apps.users import users


def as_bool(key, default):
    return env.get(key, str(default)).lower() \
        in ("yes", "true", "t", "1")


class DefaultConfig(object):

    DEBUG = as_bool('DEBUG', True)

    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    PROJECT_NAME = "oldhawaii_metadata"
    SECRET_KEY = env.get('SECRET_KEY', 'PLEASE_CHANGE_ME')

    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
    DEBUG_TB_INTERCEPT_REDIRECTS = as_bool('DEBUG_TB_INTERCEPT_REDIRECTS',
        False)

    STATIC_DIR = os.path.join(PROJECT_ROOT, 'oldhawaii_metadata', 'apps', 'static')
    TEMPLATE_DIR = os.path.join(PROJECT_ROOT, 'oldhawaii_metadata', 'apps', 'templates')

    BLUEPRINTS = (metadatas, metadata_api, www, users)

    LOG_INI = 'etc/logging.ini.json'

    CONFIRMATION_TOKEN_SALT = env.get('CONFIRMATION_TOKEN_SALT',
                                      'PLEASE_CHANGE_ME')

    # Flask-Mail
    MAIL_SERVER = env.get('MAIL_SERVER,', 'localhost')
    MAIL_PORT = env.get('MAIL_PORT,', '1025')
    MAIL_USE_TLS = as_bool('MAIL_USE_TLS', False)
    MAIL_USE_SSL = as_bool('MAIL_USE_SSL', False)
    MAIL_DEBUG = DEBUG
    MAIL_USERNAME = env.get('MAIL_USERNAME', None)
    MAIL_PASSWORD = env.get('MAIL_PASSWORD', None)
    MAIL_DEFAULT_SENDER = env.get('MAIL_DEFAULT_SENDER', None)
    MAIL_MAX_EMAILS = env.get('MAIL_MAX_EMAILS', None)
    MAIL_SUPPRESS_SEND = as_bool('MAIL_USE_SSL', False)
    MAIL_ASCII_ATTACHMENTS = as_bool('MAIL_USE_SSL', False)

    # Flask-Store
    STORE_DOMAIN = 'http://127.0.0.1:5000'
    STORE_PATH = '/tmp'

# vim: filetype=python
