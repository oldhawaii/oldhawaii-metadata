#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import redirect
from flask import request
from flask import url_for
from flask.ext.babel import lazy_gettext
from flask.ext.wtf import Form as BaseForm
from sqlalchemy.orm.exc import MultipleResultsFound
from sqlalchemy.orm.exc import NoResultFound
from wtforms import fields
from wtforms import validators

from .confirmable import user_requires_confirmation
from .models import User
from .utilities import get_message
from .utilities import get_redirect
from .utilities import is_safe_redirect_url


_default_form_field_labels = {
    'email': 'Email Address',
    'password': 'Password',
    'password_confirm': 'Password Confirmation',
    'remember_me': 'Remember Me',
}


class ValidatorMixin(object):
    def __call__(self, form, field):
        if self.message and self.message.isupper():
            self.message = get_message(self.message)
        return super(ValidatorMixin, self).__call__(form, field)


class EqualTo(ValidatorMixin, validators.EqualTo):
    pass


class Required(ValidatorMixin, validators.Required):
    pass


class Email(ValidatorMixin, validators.Email):
    pass


class Length(ValidatorMixin, validators.Length):
    pass


email_required = Required(message='EMAIL_ADDRESS_NOT_PROVIDED')
email_validator = Email(message='EMAIL_ADDRESS_INVALID')
password_required = Required(message='PASSWORD_NOT_PROVIDED')
password_length = Length(min=8, max=128, message='PASSWORD_LENGTH_INVALID')


def valid_user_email(form, field):
    form.user = User.query.filter_by(email=field.data).first()
    if form.user is None:
        raise validators.ValidationError(get_message('USER_DOES_NOT_EXIST'))


def get_form_field_label(form_field_label):
    """ Modify here if you want i18n. Probably need to turn defaults into
        lazy_gettext calls, etc. """
    return _default_form_field_labels.get(form_field_label, form_field_label)


class Form(BaseForm):
    def __init__(self, *args, **kwargs):
        super(Form, self).__init__(*args, **kwargs)


class NextFormMixin(object):
    next = fields.HiddenField()

    def __init__(self, *args, **kwargs):
        super(NextFormMixin, self).__init__(*args, **kwargs)
        if not self.next.data:
            self.next.data = get_redirect() or ''

    def redirect(self, endpoint, **values):
        if is_safe_redirect_url(self.next.data):
            return redirect(self.next.data)
        redirect_url = get_redirect()
        return redirect(redirect_url or url_for(endpoint, **values))


class EmailFormMixin(object):
    email = fields.StringField(
        get_form_field_label('email'),
        validators=[email_required, email_validator])


class PasswordFormMixin(object):
    password = fields.PasswordField(
        get_form_field_label('password'), validators=[password_required])


class NewPasswordFormMixin(object):
    password = fields.PasswordField(
        get_form_field_label('password'),
        validators=[password_required, password_length])


class PasswordConfirmFormMixin(object):
    password_confirm = fields.PasswordField(
        get_form_field_label('password_confirm'),
        validators=[EqualTo('password',
                    message='PASSWORD_CONFIRMATION_INVALID')])


class ForgotPasswordForm(Form):

    user = None

    email = fields.StringField(
        get_form_field_label('email'),
        validators=[email_required, email_validator, valid_user_email])

    def __init__(self, *args, **kwargs):
        super(ForgotPasswordForm, self).__init__(*args, **kwargs)
        if request.method == 'GET':
            self.email.data = request.args.get('email', None)

    def validate(self):
        if not super(ForgotPasswordForm, self).validate():
            return False

        if user_requires_confirmation(self.user):
            self.email.errors.append(
                get_message('EMAIL_ADDRESS_NOT_CONFIRMED'))
            return False
        return True


class LoginForm(Form,
                EmailFormMixin,
                PasswordFormMixin,
                NextFormMixin):

    user = None
    remember_me = fields.BooleanField(get_form_field_label('remember_me'))

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    def validate(self):
        if not super(LoginForm, self).validate():
            return False

        try:
            self.user = User.query.filter(User.email == self.email.data).one()
        except (MultipleResultsFound, NoResultFound):
            self.email.errors.append(get_message('PASSWORD_INVALID'))
            return False

        if self.user is None:
            self.email.errors.append(get_message('PASSWORD_INVALID'))
            return False
        elif not self.user.is_valid_password(self.password.data):
            self.email.errors.append(get_message('PASSWORD_INVALID'))
            return False
        elif user_requires_confirmation(self.user):
            self.email.errors.append(
                get_message('EMAIL_ADDRESS_NOT_CONFIRMED'))
            return False

        return True


class RegisterForm(Form,
                   EmailFormMixin,
                   PasswordFormMixin,
                   NewPasswordFormMixin,
                   PasswordConfirmFormMixin):
    user = None

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)

    def validate(self):
        if not super(RegisterForm, self).validate():
            return False

        user = User.query.filter_by(email=self.email.data).first()
        if user:
            self.email.errors.append(get_message('EMAIL_ADDRESS_EXISTS'))
            return False

        return True


class ResetPasswordForm(Form,
                        NewPasswordFormMixin,
                        PasswordConfirmFormMixin):
    pass


class SendConfirmationForm(Form):

    user = None

    email = fields.StringField(
        get_form_field_label('email'),
        validators=[email_required, email_validator, valid_user_email])

    def __init__(self, *args, **kwargs):
        super(SendConfirmationForm, self).__init__(*args, **kwargs)
        if request.method == 'GET':
            self.email.data = request.args.get('email', None)

    def validate(self):
        if not super(SendConfirmationForm, self).validate():
            return False

        if self.user.confirmed_at is not None:
            self.email.errors.append(
                get_message('EMAIL_ADDRESSS_ALREADY_CONFIRMED'))
            return False
        return True


# vim: filetype=python
