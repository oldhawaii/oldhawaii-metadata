#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import current_app
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask.ext.login import current_user
from flask.ext.login import login_required
from flask.ext.login import login_user
from flask.ext.login import logout_user

from oldhawaii_metadata.apps.users.defaults import DEFAULT_USERS_MESSAGES
from oldhawaii_metadata.extensions import login_manager
from .confirmable import confirm_confirmation_token
from .confirmable import send_confirmation_instructions
from .confirmable import system_requires_confirmation
from .decorators import anonymous_user_required
from .forms import ForgotPasswordForm
from .forms import LoginForm
from .forms import RegisterForm
from .forms import ResetPasswordForm
from .forms import SendConfirmationForm
import hashlib
from .models import User
from .recoverable import confirm_reset_password_token
from .recoverable import send_reset_password_instructions
from .recoverable import update_password
from .registerable import register_user
from werkzeug.datastructures import MultiDict


def _initialize_users(state):
    app = state.app or current_app
    for k, v in DEFAULT_USERS_MESSAGES.items():
        app.config.setdefault('MSG_' + k, v)


users = Blueprint('users', __name__, template_folder='templates')
users.record_once(_initialize_users)


@users.route('/confirm_email', methods=['GET'])
def confirm_email():
    token = request.args.get('token', None)
    if token:
        expired, invalid, user, token_data = confirm_confirmation_token(token)

        if not user or invalid:
            invalid = True

        if invalid or expired:
            return redirect(url_for('users.send_confirmation'))

        if user != current_user:
            logout_user()
            login_user(user)

        if user.confirm():
            return redirect('/')

    return redirect('/')


@users.route('/forgot_password', methods=['GET', 'POST'])
@anonymous_user_required
def forgot_password():
    if request.json:
        form = ForgotPasswordForm(MultiDict(request.json))
    else:
        form = ForgotPasswordForm()

    if form.validate_on_submit():
        send_reset_password_instructions(form.user)

    if request.json:
        return _render_json(form)

    return render_template('users/forgot_password.html',
        forgot_password_form=form)


@users.route('/login', methods=['GET', 'POST'])
@anonymous_user_required
def login():
    form = LoginForm(MultiDict(request.json)) if request.json else LoginForm()

    if form.validate_on_submit():
        login_user(form.user, remember=form.remember.data)

        if not request.json:
            return redirect(url_for('www.slash'))

    if request.json:
        return _render_json(form)
    else:
        return render_template('users/login.html', login_form=form)


def _render_json(form, include_user=False, include_authentication_token=False):

    if len(form.errors) > 0:
        code = 400
        response = dict(errors=form.errors)
    else:
        code = 200
        response = {}
        if include_user:
            response['user'] = dict(id=str(form.user.id))
        if include_authentication_token:
            response['user']['authentication_token'] = \
                form.user.get_auth_token()

    return jsonify(dict(meta=dict(code=code), response=response))


@users.route('/logout')
@login_required
def logout():
    if current_user.is_authenticated():
        logout_user()

    return redirect(request.args.get('next', None) or
                    url_for('www.slash'))


@users.route('/register', methods=['GET', 'POST'])
@anonymous_user_required
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = register_user(**form.data)
        form.user = user
        if not system_requires_confirmation():
            login_user(user)
            return redirect(url_for('www.slash'))
        else:
            return redirect(url_for('users.register_success'))
    return render_template('users/register.html', register_form=form)


@users.route('/register_success', methods=['GET'])
@anonymous_user_required
def register_success():
    if not system_requires_confirmation():
        return redirect(url_for('www.slash'))
    return render_template('users/register_success.html')


@users.route('/reset_password', methods=['GET', 'POST'])
@anonymous_user_required
def reset_password():
    token = request.args.get('token', None)
    if token:
        expired, invalid, user, data = confirm_reset_password_token(token)

        if invalid or expired:
            return redirect(url_for('users.forgot_password'))

        form = ResetPasswordForm()

        if form.validate_on_submit():
            update_password(user, form.password.data)
            login_user(user)
            return redirect('/')

        return render_template('users/reset_password.html',
                               reset_password_form=form,
                               reset_password_token=token)
    return redirect('/')


@users.route('/send_confirmation', methods=['GET', 'POST'])
@anonymous_user_required
def send_confirmation():
    if request.json:
        form = SendConfirmationForm(MultiDict(request.json))
    else:
        form = SendConfirmationForm()

    if form.validate_on_submit():
        send_confirmation_instructions(form.user)

    if request.json:
        return _render_json(form)

    return render_template('users/send_confirmation.html',
        send_confirmation_form=form)


@login_manager.user_loader
def load_user(userid):
    return User.get(userid)


@login_manager.token_loader
def load_token(token):
    max_age = app.config["REMEMBER_COOKIE_DURATION"].total_seconds()
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        data = serializer.loads(token, max_age=max_age)
        user = User.get(data[0])

        if user:
            encoded_user_email = user.email.encode('utf-8')
            if data[1] == hashlib.md5(encoded_user_email).hexdigest():
                return user
        return None
    except:
        return None

# vim: filetype=python
