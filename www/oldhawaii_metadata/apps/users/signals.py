#!/usr/bin/env python
# -*- coding: utf-8 -*-


import blinker

sig = blinker.Namespace()

user_registered = sig.signal("user-registered")

confirmation_instructions_sent = \
    sig.signal("confirmation-instructions-sent")

reset_password_instructions_sent = \
    sig.signal("reset-password-instructions-sent")

reset_password_notice_sent = \
    sig.signal("reset-password-notice-sent")

# vim: filetype=python
