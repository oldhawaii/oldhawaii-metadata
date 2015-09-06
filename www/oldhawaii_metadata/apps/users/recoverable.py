#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import current_app
from flask import url_for
import hashlib
from itsdangerous import BadSignature
from itsdangerous import SignatureExpired
from itsdangerous import URLSafeTimedSerializer
from structlog import get_logger
from werkzeug.security import safe_str_cmp
from .models import User
from .signals import reset_password_instructions_sent
from .signals import reset_password_notice_sent
from .utilities import generate_token

from oldhawaii_metadata.mail import send_mail

logger = get_logger()


def confirm_reset_password_token(token):
    max_age_key = 'USERS_RESET_PASSWORD_TOKEN_MAX_AGE_IN_SECONDS'
    max_age = current_app.config[max_age_key]

    salt = current_app.config['USERS_RESET_PASSWORD_TOKEN_SALT']
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

    if not invalid and user and user.password:
        password_hash = hashlib.md5(user.password).hexdigest()
        if not safe_str_cmp(password_hash, data[1]):
            invalid = True

    expired = expired and (user is not None)

    logger.debug("reset password token confirmed?",
                 expired=expired, invalid=invalid, user=user, data=data)

    return expired, invalid, user, data


def generate_reset_password_token_and_link(user):
    token = generate_reset_password_token(user)
    url = url_for('users.reset_password', token=token, _external=True)
    return token, url


def generate_reset_password_token(user):
    salt = current_app.config['USERS_RESET_PASSWORD_TOKEN_SALT']
    user_data = [
        str(user.id),
        hashlib.md5(user.password).hexdigest()
    ]
    return generate_token(user_data, salt=salt)


def send_password_reset_notice(user):
    signal_context = {'user': user}

    send_mail(
        'Your password has been reset',
        current_app.config['MAIL_DEFAULT_SENDER'],
        user.email,
        plain_template_path='users/emails/reset_password_notice.txt.html',
        html_template_path='users/emails/reset_password_notice.html',
        user=user)

    reset_password_notice_sent.send(
        current_app._get_current_object(),
        **signal_context)


def send_reset_password_instructions(user):
    reset_password_token, reset_password_link = \
        generate_reset_password_token_and_link(user)

    signal_context = {'user': user,
                      'reset_password_token': reset_password_token}
    mail_context = {'user': user, 'reset_password_link': reset_password_link}

    send_mail(
        'Please reset your password',
        current_app.config['MAIL_DEFAULT_SENDER'],
        user.email,
        plain_template_path=('users/emails/'
                             'reset_password_instructions.txt.html'),
        html_template_path='users/emails/reset_password_instructions.html',
        **mail_context)

    reset_password_instructions_sent.send(
        current_app._get_current_object(),
        **signal_context)


def update_password(user, password):
    user.password = password
    user.save()
    send_password_reset_notice(user)
