#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask.ext.login import login_required
import requests


metadata_api = Blueprint('api', __name__, url_prefix='/api/metadatas')


@metadata_api.route('/', methods=['POST'])
@login_required
def create(metadata):
    client = MetadataApiClient()
    return client.create(metadata)

@metadata_api.route('/', methods=['GET'])
@login_required
def get_all():
    client = MetadataApiClient()
    return client.get_all()

@metadata_api.route('/<int:id>', methods=['GET'])
@login_required
def read(id):
    client = MetadataApiClient()
    return client.get_by_id(id)

@metadata_api.route('/<int:id>', methods=['POST'])
@login_required
def update(id):
    pass

@metadata_api.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    pass


class MetadataApiClient(object):
    def __init__(self):
        super(MetadataApiClient, self).__init__()
        self.base_api_url = 'http://127.0.0.1:5001'

    def endpoint(self):
        return '{0}/metadatas/'.format(self.base_api_url)

    def create(self, metadata):
        headers = {'Content-Type': 'application/json'}
        return requests.post(endpoint(), metadata, headers=headers)

    def get_all(self):
        r = requests.get(self.endpoint())
        return r.json()

    def get_by_id(self, id):
        url = '{0}/{1}'.format(self.endpoint(), id)
        r = requests.get(url)
        return r.json()



# vim: filetype=python
