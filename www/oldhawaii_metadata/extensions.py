#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask.ext.cache import Cache
cache = Cache()

from flask_wtf.csrf import CsrfProtect
csrf = CsrfProtect()

from flask_debugtoolbar import DebugToolbarExtension
toolbar = DebugToolbarExtension()

from flask_login import LoginManager
login_manager = LoginManager()
login_manager.login_view = "users.login"

from flask_mail import Mail
mail = Mail()

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# vim: filetype=python
