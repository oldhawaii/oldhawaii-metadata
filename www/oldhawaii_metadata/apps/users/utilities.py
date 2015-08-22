#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    from urlparse import urlsplit
except ImportError:  # pragma: no cover
    from urllib.parse import urlsplit

from flask import current_app
from flask import request
from itsdangerous import URLSafeTimedSerializer


def is_safe_redirect_url(redirect_url):
    """
    Ensures redirect url is a safe url to redirect to by comparing netlocs
    """
    if redirect_url is None or redirect_url.strip() == '':
        return False
    host_url = urlsplit(request.host_url)
    redirect_url = urlsplit(redirect_url)

    return redirect_url.scheme in ('http', 'https') and \
        host_url.netloc == redirect_url.netloc


def get_redirect(explicit_redirect=None):

    possible_redirects = [
        request.args.get('next'),
        request.form.get('next'),
        request.referrer
    ]

    if explicit_redirect:
        possible_redirects.insert(0, explicit_redirect)

    for redirect in possible_redirects:
        if not redirect:
            continue
        if is_safe_redirect_url(redirect):
            return redirect


def generate_confirmation_link(user):
    """
    Generates a confirmation link for a user
    """
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(
        user.email,
        salt=current_app.config['SECURITY_PASSWORD_SALT'])


# vim: filetype=python
