'use strict';

import React from 'react';
import Metadata from '../models/Metadata';
import * as actions from '../actions';

class MetadataForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      'isSubmitting': props.isSubmitting,
      'metadata': props.metadata
    };
  }

  displayName() {
    return 'MetadataForm';
  }

  handleChange(key) {
    return function (e) {
      var key_split = key.split(".");
      var changedState = {...this.state};
      changedState[key_split[0]][key_split[1]] = e.target.value;
      this.setState(changedState);
    }.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var changedState = {...this.state};
    changedState.metadata = nextProps.metadata;
    changedState.isSubmitting = nextProps.isSubmitting;
    this.setState(changedState);
  }

  submit(event) {
    event.preventDefault();
    var metadata = new Metadata(
        'image',
        this.state.metadata.title,
        this.state.metadata.description,
        this.state.metadata.author,
        this.state.metadata.latitude,
        this.state.metadata.longitude);

    this.props.create_metadata(metadata);
  }

  // Should break into tiny components, but I'm lazy.
  render() {
    return (
      <form role="form" onSubmit={this.submit}>
        <div className="form-group">
          <label for="name">Title</label>
          <input type="text"
                 className="form-control"
                 id="title"
                 placeholder="Title"
                 value={this.state.metadata.title}
                 onChange={this.handleChange('metadata.title')}></input>
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea className="form-control"
                    id="description"
                    placeholder="Enter a description"
                    value={this.state.metadata.description}
                    onChange={this.handleChange('metadata.description')}></textarea>
        </div>
        <div className="form-group">
          <label for="author">Author</label>
          <input type="text"
                 className="form-control"
                 id="author"
                 placeholder="Author"
                 value={this.state.metadata.author}
                 onChange={this.handleChange('metadata.author')}></input>
        </div>
        <div className="form-group">
          <label for="latitude">Latitude</label>
          <input type="text"
                 className="form-control"
                 id="latitude"
                 placeholder="Latitude"
                 value={this.state.metadata.latitude}
                 onChange={this.handleChange('metadata.latitude')}></input>
        </div>
        <div className="form-group">
          <label for="author">Longitude</label>
          <input type="text"
                 className="form-control"
                 id="longitude"
                 placeholder="Longitude"
                 value={this.state.metadata.longitude}
                 onChange={this.handleChange('metadata.longitude')}></input>
        </div>
        <button type="submit"
                className="btn btn-default"
                disabled={this.state.isSubmitting}>Save!</button>
      </form>
    );
  }
};

MetadataForm.propTypes = {
  isSubmitting: React.PropTypes.bool,
  metadata: React.PropTypes.object
};

MetadataForm.defaultProps = {
  isSubmitting: false,
  metadata: new Metadata()
};

export default MetadataForm;
