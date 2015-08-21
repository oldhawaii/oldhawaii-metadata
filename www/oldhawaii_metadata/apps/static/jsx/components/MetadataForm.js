'use strict';

import React from 'react';
import Metadata from '../models/Metadata';
import DropzoneComponent from 'react-dropzone-component';

class MetadataForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      'isSubmitting': props.isSubmitting,
      'metadata': props.metadata,
      'error': props.error,
      'dropzone': props.dropzone,
      'dropzone_file_url': props.dropzone_file_url
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

  // TODO: This is not ideal. Was only temporary and I forgot to fix.
  // Will refactor out.
  componentWillReceiveProps(nextProps) {
    const changedState = {...this.state};
    changedState.metadata = nextProps.metadata;
    changedState.isSubmitting = nextProps.isSubmitting;
    changedState.error = nextProps.error;
    changedState.dropzone = nextProps.dropzone;
    changedState.dropzone_file_url = nextProps.dropzone_file_url;
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
    const componentConfig = {
      allowedFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/metadatas/upload'
    };

    const eventHandlers = {
      init: function (dz) {
        this.props.dropzone_load_success(dz);
      }.bind(this),
      // All of these receive the event as first parameter:
      drop: null,
      dragstart: null,
      dragend: null,
      dragenter: null,
      dragover: null,
      dragleave: null,
      // All of these receive the file as first parameter:
      addedfile: null,
      removedfile: null,
      thumbnail: null,
      error: null,
      processing: null,
      uploadprogress: null,
      sending: null,
      success: function (file) {
        this.props.dropzone_upload_success(file);
      }.bind(this),
      complete: null,
      canceled: null,
      maxfilesreached: null,
      maxfilesexceeded: null,
      // All of these receive a list of files as first parameter
      // and are only called if the uploadMultiple option
      // in djsConfig is true:
      processingmultiple: null,
      sendingmultiple: null,
      successmultiple: null,
      completemultiple: null,
      canceledmultiple: null,
      // Special Events
      totaluploadprogress: null,
      reset: null,
      queuecompleted: null
    };

    const djsConfig = {
      uploadMultiple: false,
      previewTemplate: React.renderToStaticMarkup(
        <div className='dz-preview dz-file-preview'>
          <div><span className='preview'><img data-dz-thumbnail/></span></div>
          <div>
            <p className='name' data-dz-name></p>
            <strong className='error text-danger' data-dz-errormessage>
            </strong>
          </div>
          <div>
            <p className='size' data-dz-size></p>
            <div aria-valuemax='100' aria-valuemin='0' aria-valuenow='0'
                 className='progress progress-striped active'
                 role='progressbar'>
              <div className='progress-bar progress-bar-success'
                   data-dz-uploadprogress style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      )
    };

    let dropzone = '';
    if (!this.state.dropzone_file_url) {
      dropzone = <DropzoneComponent config={componentConfig}
                           djsConfig={djsConfig}
                           eventHandlers={eventHandlers}/>;
    } else {
      dropzone = <img height='50%' src={this.state.dropzone_file_url}
                      width='50%'/>;
    }

    return (
      <form onSubmit={this.submit} role='form'>
        {dropzone}
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
  dropzone: React.PropTypes.object,
  dropzone_file_url: React.PropTypes.string,
  dropzone_load_success: React.PropTypes.function,
  dropzone_upload_success: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool,
  metadata: React.PropTypes.object
};

MetadataForm.defaultProps = {
  dropzone: null,
  dropzone_file_url: '',
  error: null,
  isSubmitting: false,
  metadata: new Metadata()
};

export default MetadataForm;
