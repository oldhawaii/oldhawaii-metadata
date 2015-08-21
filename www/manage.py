#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask.ext.script import Command
from flask.ext.script import Manager
from flask.ext.script import Option
from flask.ext.script import prompt_bool
from flask.ext.migrate import Migrate
from flask.ext.migrate import MigrateCommand
import os
from oldhawaii_metadata.app import get_app
from oldhawaii_metadata.extensions import db
import sys

app = get_app()

# initialize flask-migrate
migrate = Migrate(app, db)
manager = Manager(app)


@manager.option('-h', '--host', dest='host', default='127.0.0.1')
@manager.option('-p', '--port', dest='port', type=int, default=5000)
@manager.option('-w', '--workers', dest='workers', type=int, default=3)
def gunicorn(host, port, workers):
    """Start the Server with Gunicorn"""
    from gunicorn.app.base import Application

    class FlaskApplication(Application):
        def init(self, parser, opts, args):
            return {
                'bind': '{0}:{1}'.format(host, port),
                'workers': workers,
                'reload': True
            }

        def load(self):
            return app

    application = FlaskApplication()
    return application.run()


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

manager.add_command('db', MigrateCommand)


if __name__ == "__main__":
    manager.run()

# vim: filetype=python
