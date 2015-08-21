'use strict';

import React from 'react';
import DropzoneComponent from 'react-dropzone-component';

class MetadataForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  displayName() {
    return 'MetadataForm';
  }

  handleChange(key) {
    return function (e) {
      this.props.change_metadata_form(key, e.target.value);
    }.bind(this);
  }

  submit(event) {
    event.preventDefault();
    this.props.create_metadata(this.props.metadata);
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

    let dropzone = null;

    if (this.props.dropzone_file_stats == null) {
      dropzone = <DropzoneComponent config={componentConfig}
                           djsConfig={djsConfig}
                           eventHandlers={eventHandlers}/>;
    } else {
      // TODO: Needs to also replace form elements
      dropzone = (<div className='form-group'>
                  <img height='50%'
                       src={this.props.dropzone_file_stats.image_url}
                       width='50%'/>
                  <br/>
                  <label htmlFor='image_url'>Image URL</label>
                  <input className='form-control'
                         name='image_url'
                         readOnly
                         value={this.props.dropzone_file_stats.image_url}/>
                  <label htmlFor='image_width'>Image Width</label>
                  <input className='form-control'
                         name='image_width'
                         readOnly
                         value={this.props.dropzone_file_stats.image_width}/>
                  <label htmlFor='image_height'>Image Height</label>
                  <input className='form-control'
                         name='image_height'
                         readOnly
                         value={this.props.dropzone_file_stats.image_height}/>
                  </div>
                 );
    }

    return (
      <form onSubmit={this.submit} role='form'>
        {dropzone}
        <div className='form-group'>
          <label htmlFor='name'>Title</label>
          <input className='form-control'
                 id='title'
                 onChange={this.handleChange('title')}
                 placeholder='Title'
                 type='text'
                 value={this.props.metadata.title}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control'
                    id='description'
                    onChange={this.handleChange('description')}
                    placeholder='Enter a description'
                    value={this.props.metadata.description}></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Author</label>
          <input className='form-control'
                 id='author'
                 onChange={this.handleChange('author')}
                 placeholder='Author'
                 type='text'
                 value={this.props.metadata.author}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='latitude'>Latitude</label>
          <input className='form-control'
                 id='latitude'
                 onChange={this.handleChange('latitude')}
                 placeholder='Latitude'
                 step='any'
                 type='number'
                 value={this.props.metadata.latitude}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Longitude</label>
          <input className='form-control'
                 id='longitude'
                 onChange={this.handleChange('longitude')}
                 placeholder='Longitude'
                 step='any'
                 type='number'
                 value={this.props.metadata.longitude}></input>
        </div>
        <button className='btn btn-default'
                disabled={this.props.isSubmitting}
                type='submit'>Save!</button>
      </form>
    );
  }
};

MetadataForm.propTypes = {
  change_metadata_form: React.PropTypes.function,
  create_metadata: React.PropTypes.function,
  dropzone: React.PropTypes.object,
  dropzone_file_stats: React.PropTypes.object,
  dropzone_load_success: React.PropTypes.function,
  dropzone_upload_success: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool,
  metadata: React.PropTypes.object
};

export default MetadataForm;
