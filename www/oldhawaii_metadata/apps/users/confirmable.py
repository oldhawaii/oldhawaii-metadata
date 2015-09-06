#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import current_app
from flask import url_for
import hashlib
from itsdangerous import BadSignature
from itsdangerous import SignatureExpired
from itsdangerous import URLSafeTimedSerializer
from structlog import get_logger

from .models import User
from .signals import confirmation_instructions_sent
from .utilities import generate_token

from oldhawaii_metadata.mail import send_mail

logger = get_logger()


def confirm_confirmation_token(token):
    """Returns the expired status, invalid status, user of a confirmation
    token, and the token itself. For example::

        expired, invalid, user, token = confirm_confirmation_token('...')

    :param token: Confirmation token as str
    """
    max_age_key = 'USERS_REGISTER_CONFIRMATION_TOKEN_MAX_AGE_IN_SECONDS'
    max_age = current_app.config[max_age_key]

    salt = current_app.config['USERS_REGISTER_CONFIRMATION_TOKEN_SALT']
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

    user, data = None, None
    expired, invalid = False, False

    try:
        data = serializer.loads(
            token,
            max_age=max_age,
            salt=salt)
    except SignatureExpired:
        d, data = serializer.loads_unsafe(token, salt=salt)
        expired = True
    except (BadSignature, TypeError, ValueError):
        invalid = True

    if data:
        user = User.get(id=data[0])

    expired = expired and (user is not None)

    logger.debug("confirmation token confirmed?",
                 expired=expired, invalid=invalid, user=user, data=data)

    return expired, invalid, user, data


def generate_confirmation_token(user):
    """Generates a confirmation token for the user

    :param user: User to generate confirmation token for
    """
    salt = current_app.config['USERS_REGISTER_CONFIRMATION_TOKEN_SALT']
    user_data = [
        str(user.id),
        hashlib.md5(user.email.encode('utf-8')).hexdigest()
    ]
    return generate_token(user_data, salt=salt)


def generate_confirmation_token_and_link(user):
    """Generates a confirmation token and a link for the user

    :param user: User to generate confirmation token and link for
    """
    token = generate_confirmation_token(user)
    url = url_for('users.confirm_email', token=token, _external=True)
    return token, url


def send_confirmation_instructions(user):
    """Sends confirmation instructions email to the specified user

    :param user: User to send instructions to
    """

    confirmation_token, confirmation_link = \
        generate_confirmation_token_and_link(user)

    signal_context = {'user': user, 'confirmation_token': confirmation_token}
    mail_context = {'user': user, 'confirmation_link': confirmation_link}

    send_mail(
        'Please confirm your email address',
        current_app.config['MAIL_DEFAULT_SENDER'],
        user.email,
        plain_template_path='users/emails/confirmation_instructions.txt.html',
        html_template_path='users/emails/confirmation_instructions.html',
        **mail_context)

    confirmation_instructions_sent.send(
        current_app._get_current_object(),
        **signal_context)


def system_requires_confirmation():
    """Returns `True` if the system requires confirmation."""
    return current_app.config['USERS_CONFIRMATION_REQUIRED']


def user_requires_confirmation(user):
    """Returns `True` if the user requires confirmation.

    :param user: User that needs confirmation
    """
    return system_requires_confirmation() and \
        user.confirmed_at is None


# vim: filetype=python
