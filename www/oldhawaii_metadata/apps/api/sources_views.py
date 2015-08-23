#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import jsonify
from flask import request
from flask.ext.login import login_required
import json
from .utilities import ResourceApiClient

BASE_API_URL = 'http://127.0.0.1:5001'

sources_api = Blueprint(
    'sources_api', __name__, url_prefix='/api/sources')


@sources_api.route('/', methods=['POST'])
def create():
    json_data = json.loads(request.data)
    client = ResourceApiClient(BASE_API_URL, 'sources')
    id = client.create(json_data)
    return jsonify({'id': id})


@sources_api.route('/', methods=['GET'])
@login_required
def get_all():
    client = ResourceApiClient(BASE_API_URL, 'sources')
    sources = client.get_all(request.query_string)
    return jsonify(sources)


@sources_api.route('/<string:id>', methods=['GET'])
@login_required
def read(id):
    client = ResourceApiClient(BASE_API_URL, 'sources')
    source = client.get_by_id(id)
    return jsonify(source)


@sources_api.route('/<string:id>', methods=['PUT'])
@login_required
def update(id):
    json_data = json.loads(request.data)
    client = ResourceApiClient(BASE_API_URL, 'sources')
    id = client.update(json_data)
    return jsonify({'id': id})


@sources_api.route('/<string:id>', methods=['DELETE'])
@login_required
def delete(id):
    client = ResourceApiClient(BASE_API_URL, 'sources')
    result = client.delete(id)
    return jsonify({'id': id, 'status': result})

# vim: filetype=python
