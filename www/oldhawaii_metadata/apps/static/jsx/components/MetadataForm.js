'use strict';

import React from 'react';
import Metadata from '../models/Metadata';

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
      const key_split = key.split('.');
      const changedState = {...this.state};
      changedState[key_split[0]][key_split[1]] = e.target.value;
      this.setState(changedState);
    }.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const changedState = {...this.state};
    changedState.metadata = nextProps.metadata;
    changedState.isSubmitting = nextProps.isSubmitting;
    this.setState(changedState);
  }

  submit(event) {
    event.preventDefault();
    const metadata = new Metadata(
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
      <form onSubmit={this.submit} role='form'>
        <div className='form-group'>
          <label htmlFor='name'>Title</label>
          <input className='form-control'
                 id='title'
                 onChange={this.handleChange('metadata.title')}
                 placeholder='Title'
                 type='text'
                 value={this.state.metadata.title}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control'
                    id='description'
                    onChange={this.handleChange('metadata.description')}
                    placeholder='Enter a description'
                    value={this.state.metadata.description}></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Author</label>
          <input className='form-control'
                 id='author'
                 onChange={this.handleChange('metadata.author')}
                 placeholder='Author'
                 type='text'
                 value={this.state.metadata.author}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='latitude'>Latitude</label>
          <input className='form-control'
                 id='latitude'
                 onChange={this.handleChange('metadata.latitude')}
                 placeholder='Latitude'
                 type='text'
                 value={this.state.metadata.latitude}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Longitude</label>
          <input className='form-control'
                 id='longitude'
                 onChange={this.handleChange('metadata.longitude')}
                 placeholder='Longitude'
                 type='text'
                 value={this.state.metadata.longitude}></input>
        </div>
        <button className='btn btn-default'
                disabled={this.state.isSubmitting}
                type='submit'>Save!</button>
      </form>
    );
  }
};

MetadataForm.propTypes = {
  create_metadata: React.PropTypes.function,
  isSubmitting: React.PropTypes.bool,
  metadata: React.PropTypes.object
};

MetadataForm.defaultProps = {
  isSubmitting: false,
  metadata: new Metadata()
};

export default MetadataForm;
