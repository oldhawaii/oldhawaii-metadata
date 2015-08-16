#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import redirect
from flask import request
from flask import url_for
from flask.ext.wtf import Form
from sqlalchemy.orm.exc import MultipleResultsFound
from sqlalchemy.orm.exc import NoResultFound
from wtforms import fields
from wtforms import validators

from .models import User
from .utilities import get_redirect


class RedirectForm(Form):
    next = fields.HiddenField()

    def __init__(self, *args, **kwargs):
        super(RedirectForm, self).__init__(*args, **kwargs)
        if not self.next.data:
            self.next.data = get_redirect() or ''

    def redirect(self, endpoint, **values):
        if is_safe_redirect_url(self.next.data):
            return redirect(self.next.data)
        redirect_url = get_redirect()
        return redirect(redirect_url or url_for(endpoint, **values))



class LoginForm(RedirectForm):

    email = fields.StringField(
        validators=[validators.InputRequired(), validators.Email()])

    password = fields.PasswordField(
        validators=[validators.InputRequired()])

    remember = fields.BooleanField()

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    def validate_password(form, field):
        try:
            user = User.query.filter(User.email == form.email.data).one()
        except (MultipleResultsFound, NoResultFound):
            raise validators.ValidationError("Invalid password")

        if user is None:
            raise validators.ValidationError("Invalid password")
        if not user.is_valid_password(form.password.data):
            raise validators.ValidationError("Invalid password")

        form.user = user


class RegisterForm(Form):
    username = fields.TextField(
        'Username',
        validators=[validators.InputRequired(),
                    validators.Length(min=3, max=25)])

    email = fields.TextField(
        'Email',
        validators=[validators.InputRequired(),
                    validators.Email(),
                    validators.Length(min=6, max=40)])

    password = fields.PasswordField(
        'Password',
        validators=[validators.InputRequired(),
                    validators.Length(min=6, max=256)])

    confirm = fields.PasswordField(
        'Verify password',
        [validators.InputRequired(),
         validators.EqualTo('password', message='Passwords must match')])

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self):
        initial_validation = super(RegisterForm, self).validate()
        if not initial_validation:
            return False
        user = User.query.filter_by(username=self.username.data).first()
        if user:
            self.username.errors.append("Username already registered")
            return False
        user = User.query.filter_by(email=self.email.data).first()
        if user:
            self.email.errors.append("Email already registered")
            return False
        return True
