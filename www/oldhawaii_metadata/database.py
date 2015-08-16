#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .extensions import db


class CrudMixin(object):

    """Mixin that create/read/update/delete methods"""

    __table_args__ = {'extend_existing': True}

    @classmethod
    def create(cls, commit=True, **kwargs):
        """Creates a new record and saves to database."""
        instance = cls(**kwargs)
        return instance.save(commit=commit)

    @classmethod
    def get(cls, id):
        return cls.query.get(id)

    # We will also proxy Flask-SqlAlchemy's get_or_44
    # for symmetry
    @classmethod
    def get_or_404(cls, id):
        return cls.query.get_or_404(id)

    def update(self, commit=True, **kwargs):
        """Update existing record and saves to database."""
        for attr, value in kwargs.iteritems():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """Saves record to database."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Removes the record from database."""
        db.session.delete(self)
        return commit and db.session.commit()


class Model(CrudMixin, db.Model):
    __abstract__ = True

# vim: filetype=python
