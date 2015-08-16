'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var MetadataActions = Reflux.createActions([
  "addMetadata",
]);

MetadataActions.addMetadata.preEmit = function (metadata) {
  request.post('/metadatas/', {metadata: metadata}, function () {});
};

module.exports = MetadataActions;

