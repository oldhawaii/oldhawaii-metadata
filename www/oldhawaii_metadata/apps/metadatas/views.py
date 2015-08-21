#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import jsonify
from flask import render_template
from flask import request
from flask.ext.login import login_required
import json
from oldhawaii_metadata.apps.api import metadata_views
from oldhawaii_metadata.extensions import csrf
from oldhawaii_metadata.extensions import store
from .utilities import get_image_size_from_url


metadatas = Blueprint(
    'metadatas',
    __name__,
    template_folder='templates',
    url_prefix='/metadatas')


@metadatas.route('/')
@login_required
def index():
    metadatas = metadata_views.get_all()
    metadatas = metadatas.get('_items', None) if metadatas else None
    return render_template('metadatas/index.html', metadatas=metadatas)

@metadatas.route('/add', methods=['GET'])
@login_required
def add_metadata():
    return render_template('metadatas/add_metadata.html')

@metadatas.route('/<string:id>', methods=['GET'])
@login_required
def view_metadata(id):
    metadata = metadata_views.read(id)
    return render_template('metadatas/view_metadata.html', metadata=metadata)

@metadatas.route('/<string:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_metadata(id):
    return render_template('metadatas/edit_metadata.html')

@csrf.exempt
@metadatas.route('/upload', methods=['POST'])
@login_required
def upload():
    provider = store.Provider(request.files.get('file'))
    provider.save()
    width, height = get_image_size_from_url(provider.absolute_url)
    return jsonify({"image_url": provider.absolute_url,
                    "image_width": width or '',
                    "image_height": height or ''})

# vim: filetype=python
