#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask.ext.login import login_required
from oldhawaii_metadata.apps.api import sources_views


sources = Blueprint(
    'sources',
    __name__,
    template_folder='templates',
    url_prefix='/sources')


@sources.route('/')
@login_required
def index():
    sources = sources_views.get_all()
    sources = sources.get('_items', None) if sources else None
    return render_template('sources/index.html',
                           sources=sources)


@sources.route('/add', methods=['GET'])
@login_required
def add_source():
    return render_template('sources/add_source.html')


@sources.route('/<string:id>', methods=['GET'])
@login_required
def view_source(id):
    source = sources_views.read(id)
    return render_template('sources/view_source.html', source=source)


@sources.route('/<string:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_source(id):
    return render_template('sources/edit_source.html')


# vim: filetype=python
