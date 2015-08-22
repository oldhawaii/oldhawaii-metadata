#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import jsonify
from flask import render_template
from flask import request
from flask.ext.login import login_required
from oldhawaii_metadata.apps.api import digital_assets_views
from oldhawaii_metadata.extensions import csrf
from oldhawaii_metadata.extensions import store
from .utilities import get_image_size_from_url


digital_assets = Blueprint(
    'digital_assets',
    __name__,
    template_folder='templates',
    url_prefix='/digital_assets')


@digital_assets.route('/')
@login_required
def index():
    dig_assets = digital_assets_views.get_all()
    dig_assets = dig_assets.get('_items', None) if dig_assets else None
    return render_template('digital_assets/index.html',
                           digital_assets=dig_assets)


@digital_assets.route('/upload', methods=['GET'])
@login_required
def upload_digital_asset():
    return render_template('digital_assets/upload_digital_asset.html')


@digital_assets.route('/link', methods=['GET'])
@login_required
def link_digital_asset():
    return render_template('digital_assets/link_digital_asset.html')


@digital_assets.route('/<string:id>', methods=['GET'])
@login_required
def view_digital_asset(id):
    dig_asset = digital_assets_views.read(id)
    return render_template('digital_assets/view_digital_asset.html',
                           digital_asset=dig_asset)


@digital_assets.route('/<string:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_digital_asset(id):
    return render_template('digital_assets/edit_digital_asset.html')


@csrf.exempt
@digital_assets.route('/upload/content', methods=['POST'])
@login_required
def upload_digital_asset_content():
    provider = store.Provider(request.files.get('file'))
    provider.save()
    width, height = get_image_size_from_url(provider.absolute_url)
    return jsonify({"image_url": provider.absolute_url,
                    "image_width": width or '',
                    "image_height": height or ''})

# vim: filetype=python
