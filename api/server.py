# -*- coding: utf-8 -*-

import os
from eve import Eve

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

if 'PORT' in os.environ:
    port = int(os.environ.get('PORT'))
    host = '0.0.0.0'
else:
    port = 5001
    host = '127.0.0.1'

app = Eve(template_folder=tmpl_dir, static_folder=static_dir)

if __name__ == '__main__':
    app.run(host=host, port=port)

