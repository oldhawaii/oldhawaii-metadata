#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from flask.ext.script import prompt_bool
from flask.ext.migrate import Migrate
from flask.ext.migrate import MigrateCommand
from oldhawaii_metadata.app import get_app
from oldhawaii_metadata.extensions import db

app = get_app()

# initialize flask-migrate
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def createdb():
    """
    Creates all database tables
    """
    db.create_all()


@manager.command
def dropdb():
    """
    Drops all database tables
    """
    if prompt_bool("Are you sure you want to lose all your data"):
        db.drop_all()


if __name__ == "__main__":
    manager.run()

# vim: filetype=python
