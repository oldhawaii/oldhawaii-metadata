#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import redirect
import flask.ext.login as flask_login
from functools import wraps


def anonymous_user_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if flask_login.current_user.is_authenticated:
            return redirect('/')
        return f(*args, **kwargs)
    return wrapper

# vim: filetype=python
