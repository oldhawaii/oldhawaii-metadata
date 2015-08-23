# oldhawaii-metadata

Tool for collecting metadata surrounding [Old Hawaii](http://oldhawaii.org) digital assets.

This project is split up into two components:

  * API server
  * WWW front end

## API server

The API server uses the [Python-Eve](http://python-eve.org/) framework.

### Installation

`cd api`
`mkvirtualenv --no-site-packages oldhawaii-metadata-api`
`pip install -r requirements.txt`
`python server.py`

## WWW front end

The WWW server is a [Flask](http://flask.pocoo.org/) implementation with a
[Redux](https://github.com/rackt/redux) front-end.

### Installation

`cd www`
`mkvirtualenv --no-site-packages oldhawaii-metadata-www`
`pip install -r requirements.txt`
`python manage.py gunicorn`

## TODO

  * Need to add update digital assets of type image
  * Need to add delete digital assets of type image
  * Need to add create digital assets of type audio
  * Need to add read digital assets of type audio
  * Need to add update digital assets of type audio
  * Need to add delete digital assets of type audio
  * Need to add delete source organization confirmation dialog
  * Need to add link digital assets of type image
  * ~~Need to add csrf token to metatag for digital assets post request~~
  * ~~Need to add create source organization~~
  * ~~Need to add read source organization~~
  * ~~Need to add update source organization~~
  * ~~Need to add csrf token to metatag for source put/post requests~~
  * ~~Need to add delete source organization~~
  * Need to cleanup registration process
  * Need to add user roles
  * Need to add auto-complete for source organization
  * Need to add Flask-Sentinel to API server
  * ~~Need to add os-level build notifications~~
  * Need to add script to backup mongo somewhere
  * Need to add code to shut off middleware logging
  * Need to add jest test cases for all routes

## License

OldHawaii-Metadata is licensed under the MIT License.
