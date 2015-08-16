'use strict';

var React = require('react');
var MetadataForm = require('./components/MetadataForm');

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <MetadataForm />,
    document.getElementById('main')
  )
});
