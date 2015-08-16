'use strict';

var Reflux = require('reflux');
var Metadata = require('./models/metadata.js');


var MetadataStore = Reflux.createStore({
    listenables: [],
    init: function () {
    },
    getInitialState: function () {
    },
    onAddTodo: function (todo) {
    },
});

module.exports = TodoListStore;

