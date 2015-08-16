#!/usr/bin/env python
# -*- coding: utf-8 -*-

import bcrypt
from flask.ext.login import UserMixin
from sqlalchemy.ext.hybrid import hybrid_property

from oldhawaii_metadata.database import Model
from oldhawaii_metadata.extensions import db
from oldhawaii_metadata.helpers import constant_time_compare


class User(Model, UserMixin):
    __tablename__ = 'users_user'

    id = db.Column(
        db.Integer,
        primary_key=True,
        unique=True,
        nullable=False)

    username = db.Column(
        db.String(50))

    email = db.Column(
        db.String(120),
        unique=True)

    _password = db.Column(
        db.LargeBinary(120))

    _salt = db.Column(
        db.String(120))

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        if self._salt is None:
            self._salt = bytes(bcrypt.gensalt())
        self._password = self._hash_password(value)

    def is_valid_password(self, password):
        new_hash = self._hash_password(password)
        return constant_time_compare(new_hash, self._password)

    def _hash_password(self, password):
        pwd = password.encode("utf-8")
        salt = bytes(self._salt)
        hashed = bcrypt.hashpw(pwd, salt)
        return bytes(hashed)

    def __repr__(self):
        return "<User #{:d}>".format(self.id)


# vim: filetype=python
