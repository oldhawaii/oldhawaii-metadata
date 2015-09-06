#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import current_app


def config_value(key, default=None, app=None):
    app = app or current_app
    return app.config.get(key.upper(), default)

# vim: filetype=python
