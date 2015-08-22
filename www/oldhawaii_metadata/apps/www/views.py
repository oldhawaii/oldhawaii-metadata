#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import url_for
from flask.ext.login import current_user
from oldhawaii_metadata.apps.users.forms import LoginForm


www = Blueprint('www', __name__, template_folder='templates')


@www.route('/')
def slash():
    if current_user.is_authenticated():
        return redirect(url_for('digital_assets.index'))

    form = LoginForm()
    return render_template('www/slash.html', form=form)

# vim: filetype=python
