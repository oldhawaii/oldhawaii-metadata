#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from oldhawaii_metadata.apps.users.forms import LoginForm


www = Blueprint('www', __name__, template_folder='templates')


@www.route('/')
def slash():
    form = LoginForm()
    return render_template('www/slash.html', form=form)

# vim: filetype=python
