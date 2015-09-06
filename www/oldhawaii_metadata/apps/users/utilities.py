#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    from urlparse import urlsplit
except ImportError:  # pragma: no cover
    from urllib.parse import urlsplit

from flask import current_app
from flask import request
from itsdangerous import URLSafeTimedSerializer

from hnlmakerfaire.utilities import config_value


def generate_token(user_data, salt=None):
    """Generates a token containing user data

    :param user_data: User data to store within token
    :param salt: Salt to use
    """
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(user_data, salt=salt)


def get_message(message_key,
                message_key_config_prefix='MSG_', app=None):

    complete_message_key = '{0}{1}'.format(message_key_config_prefix,
                                           message_key).upper()
    return config_value(complete_message_key)


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


def is_safe_redirect_url(redirect_url):
    """Ensures redirect_url is a safe url to redirect to by comparing netlocs

    :param redirect_url: Redirect url to check
    """
    if redirect_url is None or redirect_url.strip() == '':
        return False
    host_url = urlsplit(request.host_url)
    redirect_url = urlsplit(redirect_url)

    return redirect_url.scheme in ('http', 'https') and \
        host_url.netloc == redirect_url.netloc

# vim: filetype=python
