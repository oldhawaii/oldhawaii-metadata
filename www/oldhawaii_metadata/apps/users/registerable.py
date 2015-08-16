#!/usr/bin/env python
# -*- coding: utf-8 -*-

from oldhawaii_metadata.mail import send_mail
from .models import User
from .signals import user_registered
from .confirmable import generate_confirmation_token_and_link


def register_user(**kwargs):
    kwargs.pop('confirm', None)
    user = User.create(**kwargs)

    confirmation_token, confirmation_link = \
        generate_confirmation_token_and_link(user)

    user_registered.send(
        user=user,
        confirmation_token=confirmation_token)

    send_mail(
        'thanks for registering',
        "ryankanno@gmail.com",
        user.email,
        'welcome',
        user=user,
        confirmation_link=confirmation_link)

    return user

# vim: filetype=python
