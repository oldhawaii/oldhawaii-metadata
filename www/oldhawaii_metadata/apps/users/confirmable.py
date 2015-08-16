#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import current_app
import hashlib
from itsdangerous import URLSafeTimedSerializer


def generate_confirmation_token_and_link(user):
    """
    Generates a confirmation token and a link for the user
    """
    token = generate_confirmation_token(user)
    return token, token


def generate_confirmation_token(user):
    """
    Generates a confirmation token for a user
    """
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

    encoded_user_email = user.email.encode('utf-8')

    user_data = [
        str(user.id),
        hashlib.md5(encoded_user_email).hexdigest()
    ]

    return serializer.dumps(
        user_data,
        salt=current_app.config['CONFIRMATION_TOKEN_SALT'])


# vim: filetype=python
