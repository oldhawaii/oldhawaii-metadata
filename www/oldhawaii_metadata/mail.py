#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template
from flask_mail import Message
from .extensions import mail


def send_mail(
        subject,
        sender,
        recipients,
        template,
        **context):

    if type(recipients) is not list:
        recipients = [recipients]

    msg = Message(subject,
                  sender=sender,
                  recipients=recipients)

    msg.body = render_template(
        "{0}/{1}.txt".format('users/emails', template), **context)

    msg.html = render_template(
        "{0}/{1}.html".format('users/emails', template), **context)

    mail.send(msg)

# vim: filetype=python
