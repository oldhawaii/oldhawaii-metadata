#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import url_for
from flask.ext.login import login_required
import json
from oldhawaii_metadata.apps.api import sources_views


sources = Blueprint(
    'sources',
    __name__,
    template_folder='templates',
    url_prefix='/sources')


@sources.route('/')
@login_required
def index():
    res = sources_views.get_all()
    json_response = json.loads(res.data)
    sources = json_response.get('_items', None) if json_response else None
    return render_template('sources/index.html',
                           sources=sources)


@sources.route('/add', methods=['GET'])
@login_required
def add_source():
    return render_template('sources/add_source.html')


@sources.route('/<string:id>', methods=['GET'])
@login_required
def view_source(id):
    res = sources_views.read(id)
    source = json.loads(res.data)
    return render_template('sources/view_source.html', source=source)


@sources.route('/<string:id>/edit', methods=['GET'])
@login_required
def edit_source(id):
    return render_template('sources/edit_source.html', source_id=id)


@sources.route('/<string:id>/delete', methods=['POST'])
@login_required
def delete_source(id):
    res = sources_views.delete(id)
    return redirect(url_for('sources.index'))


# vim: filetype=python
