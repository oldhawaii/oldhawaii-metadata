'use strict';

var React = require('react');

var MetadataForm = React.createClass({
  displayName: 'MetadataForm',
  getInitialState: function() {
    return {'title': '', 'description': ''};
  },
  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  submitMetadata: function (event) {
    event.preventDefault();
  },
  render: function () {
    return (
      <form role="form" onSubmit={this.submitMetadata}>
        <div className="form-group">
          <label for="name">Title</label>
          <input type="text"
                 className="form-control"
                 id="title"
                 placeholder="Title"
                 value={this.state.title}
                 onChange={this.handleChange('title')}></input>
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea className="form-control"
                    id="description"
                    placeholder="Enter a description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save!</button>
      </form>
    );
  }
});

module.exports = MetadataForm
