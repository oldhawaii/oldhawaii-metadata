#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import jsonify
from flask import request
from flask.ext.login import login_required
import json
from oldhawaii_metadata.extensions import csrf
from .utilities import ResourceApiClient

BASE_API_URL = 'http://127.0.0.1:5001'

sources_api = Blueprint(
    'sources_api', __name__, url_prefix='/api/sources')


@csrf.exempt
@sources_api.route('/', methods=['POST'])
def create():
    json_data = json.loads(request.data)
    client = ResourceApiClient(BASE_API_URL, 'sources')
    response = client.create(json_data)
    if response.status_code == 201:
        return jsonify(**request.json)
    else:
        return response.text, response.status_code


@sources_api.route('/', methods=['GET'])
@login_required
def get_all():
    client = ResourceApiClient(BASE_API_URL, 'sources')
    return client.get_all(request.query_string)


@sources_api.route('/<int:id>', methods=['GET'])
@login_required
def read(id):
    client = ResourceApiClient(BASE_API_URL, 'sources')
    return client.get_by_id(id)


@sources_api.route('/<int:id>', methods=['POST'])
@login_required
def update(id):
    pass


@sources_api.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    pass

# vim: filetype=python
