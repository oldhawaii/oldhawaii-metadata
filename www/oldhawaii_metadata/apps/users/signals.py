#!/usr/bin/env python
# -*- coding: utf-8 -*-


import blinker

signals = blinker.Namespace()

user_registered = signals.signal("user-registered")

# vim: filetype=python
