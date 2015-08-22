#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests


class ResourceApiClient(object):
    def __init__(self, base_url, resource_type):
        super(ResourceApiClient, self).__init__()
        self.base_url = base_url
        self.resource_type = resource_type

    def endpoint(self):
        return '{0}/{1}/'.format(self.base_url, self.resource_type)

    def create(self, resource_as_json):
        headers = {'Content-Type': 'application/json'}
        r = requests.post(
            self.endpoint(),
            data=json.dumps(resource_as_json),
            headers=headers)
        if r.status_code == 201:
            return r.json()["_id"]
        else:
            return None

    def update(self, resource_as_json):
        headers = {'Content-Type': 'application/json'}
        url = '{0}{1}'.format(self.endpoint(), resource_as_json.pop('_id'))
        r = requests.patch(
            url,
            data=json.dumps(resource_as_json),
            headers=headers)
        if r.status_code == 200:
            return r.json()["_id"]
        else:
            return None

    def get_all(self, pagination_and_filters=None):
        url = "{0}?{1}".format(self.endpoint(), pagination_and_filters or '')
        r = requests.get(url)
        if r.status_code == 200:
            return r.json()
        else:
            return None

    def get_by_id(self, id):
        url = '{0}{1}'.format(self.endpoint(), id)
        r = requests.get(url)
        if r.status_code == 200:
            return r.json()
        else:
            return None


# vim: filetype=python
