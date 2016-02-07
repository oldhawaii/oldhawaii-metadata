#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template
from flask_mail import Message
from .extensions import mail


def send_mail(
        subject,
        sender,
        recipients,
        plain_template_path,
        html_template_path,
        **context):

    if type(recipients) is not list:
        recipients = [recipients]

    msg = Message(subject,
                  sender=sender,
                  recipients=recipients)

    msg.body = render_template(plain_template_path, **context)

    msg.html = render_template(html_template_path, **context)

    mail.send(msg)

# vim: filetype=python
