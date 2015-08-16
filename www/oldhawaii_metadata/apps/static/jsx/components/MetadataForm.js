'use strict';

var React = require('react');

var MetadataForm = React.createClass({
  displayName: 'MetadataForm',
  getInitialState: function() {
    return {};
  },
  submitMetadata: function (event) {
    event.preventDefault();
  },
  render: function() {
    return (
      <form role="form" onSubmit={this.submitMetadata}>
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Name"></input>
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea className="form-control" id="description" placeholder="Enter a description"></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save!</button>
      </form>
    );
  }
});


module.exports = MetadataForm
