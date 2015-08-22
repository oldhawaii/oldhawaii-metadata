#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import jsonify
from flask import request
from flask.ext.login import login_required
import json
from oldhawaii_metadata.extensions import csrf
import requests


digital_assets_api = Blueprint(
    'digital_assets_api', __name__, url_prefix='/api/digital_assets')


@csrf.exempt
@digital_assets_api.route('/', methods=['POST'])
def create():
    json_data = json.loads(request.data)
    json_data['latitude'] = float(json_data['latitude'])
    json_data['longitude'] = float(json_data['longitude'])
    client = DigitalAssetsApiClient()
    response = client.create(json_data)
    if response.status_code == 201:
        return jsonify(**request.json)
    else:
        return response.text, response.status_code

@digital_assets_api.route('/', methods=['GET'])
@login_required
def get_all():
    client = DigitalAssetsApiClient()
    return client.get_all(request.query_string)

@digital_assets_api.route('/<int:id>', methods=['GET'])
@login_required
def read(id):
    client = DigitalAssetsApiClient()
    return client.get_by_id(id)

@digital_assets_api.route('/<int:id>', methods=['POST'])
@login_required
def update(id):
    pass

@digital_assets_api.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    pass


class DigitalAssetsApiClient(object):
    def __init__(self):
        super(DigitalAssetsApiClient, self).__init__()
        self.base_api_url = 'http://127.0.0.1:5001'

    def endpoint(self):
        return '{0}/digital_assets/'.format(self.base_api_url)

    def create(self, digital_asset):
        headers = {'Content-Type': 'application/json'}
        return requests.post(
            self.endpoint(),
            data=json.dumps(digital_asset),
            headers=headers)

    def get_all(self, pagination_and_filters=None):
        url = "{0}?{1}".format(self.endpoint(), pagination_and_filters or '')
        r = requests.get(url)
        return r.json()

    def get_by_id(self, id):
        url = '{0}{1}'.format(self.endpoint(), id)
        r = requests.get(url)
        return r.json()



# vim: filetype=python
