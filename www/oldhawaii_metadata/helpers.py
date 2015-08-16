#!/usr/bin/env python
# -*- coding: utf-8 -*-

import importlib
import inspect


def load_module_instances(module_name, package=None):
    mod = importlib.import_module(module_name, package)
    return [ext for ext in mod.__dict__.itervalues() if
            hasattr(ext, '__dict__') and not inspect.isclass(ext)]


def constant_time_compare(val1, val2):
    if len(val1) != len(val2):
        return False
    result = 0
    for x, y in zip(val1, val2):
        result |= ord(x) ^ ord(y)
    return result == 0
# vim: filetype=python
