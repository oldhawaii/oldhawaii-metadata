#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask.ext.login import login_required
from oldhawaii_metadata.apps.api import metadata_views


metadatas = Blueprint(
    'metadatas',
    __name__,
    template_folder='templates',
    url_prefix='/metadatas')


@metadatas.route('/')
@login_required
def index():
    metadatas = metadata_views.get_all()
    return render_template('metadatas/index.html', metadatas=metadatas)

@metadatas.route('/add')
@login_required
def add_metadata():
    return render_template('metadatas/add_metadata.html')

# vim: filetype=python
