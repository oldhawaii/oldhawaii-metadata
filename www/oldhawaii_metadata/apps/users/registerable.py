#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import current_app
from .confirmable import generate_confirmation_token_and_link
from .confirmable import system_requires_confirmation
from .models import User
from .signals import user_registered

from oldhawaii_metadata.mail import send_mail


def register_user(**kwargs):
    kwargs.pop('password_confirm', None)
    user = User.create(**kwargs)

    signal_context = {'user': user}
    mail_context = {'user': user}

    if system_requires_confirmation():
        confirmation_token, confirmation_link = \
            generate_confirmation_token_and_link(user)
        signal_context['confirmation_token'] = confirmation_token
        mail_context['confirmation_link'] = confirmation_link

    user_registered.send(
        current_app._get_current_object(),
        **signal_context)

    send_mail(
        'Thank you for registering!',
        current_app.config['MAIL_DEFAULT_SENDER'],
        user.email,
        plain_template_path='users/emails/welcome.txt.html',
        html_template_path='users/emails/welcome.html',
        **mail_context)

    return user

# vim: filetype=python
