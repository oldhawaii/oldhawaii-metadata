#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import flash
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask.ext.login import current_user
from flask.ext.login import login_required
from flask.ext.login import login_user
from flask.ext.login import logout_user

from oldhawaii_metadata.extensions import login_manager
from .forms import LoginForm
from .forms import RegisterForm
from .models import User
from .registerable import register_user

users = Blueprint('users', __name__, template_folder='templates')


@users.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        login_user(form.user, remember=form.remember.data)
        return redirect(url_for('www.slash'))
    print form.__dict__
    return render_template('users/login.html', form=form)


@users.route('/logout')
@login_required
def logout():
    if current_user.is_authenticated():
        logout_user()

    return redirect(request.args.get('next', None) or
                    url_for('www.slash'))


@users.route('/register', methods=('GET', 'POST'))
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = register_user(**form.data)
        login_user(user)
        return redirect(url_for('www.slash'))
    return render_template('users/register.html', form=form)


@login_manager.user_loader
def load_user(userid):
    return User.get(userid)

# vim: filetype=python
