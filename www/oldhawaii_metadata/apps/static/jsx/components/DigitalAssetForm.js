'use strict';

import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import LatLonMap from './LatLonMap';

class DigitalAssetForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSelected = this.handleLocationSelected.bind(this);
  }

  displayName() {
    return 'DigitalAssetForm';
  }

  handleChange(key) {
    return function (e) {
      this.props.change_digital_asset_form(key, e.target.value);
    }.bind(this);
  }

  handleLocationSelected(lat, lng) {
    console.log('LAT:' + lat);
    console.log('LNG:' + lng);
  }

  submit(event) {
    event.preventDefault();
    this.props.create_digital_asset(this.props.digital_asset);
  }

  // Should break into tiny components, but I'm lazy.
  render() {
    const componentConfig = {
      allowedFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/digital_assets/upload/content'
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

    // TODO Not sure this is a good check
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
                         value={this.props.digital_asset.image_url}/>
                  <label htmlFor='image_width'>Image Width</label>
                  <input className='form-control'
                         name='image_width'
                         readOnly
                         value={this.props.digital_asset.image_width}/>
                  <label htmlFor='image_height'>Image Height</label>
                  <input className='form-control'
                         name='image_height'
                         readOnly
                         value={this.props.digital_asset.image_height}/>
                  </div>
                 );
    }

    return (
      <form onSubmit={this.submit} role='form'>
        {dropzone}
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input className='form-control'
                 id='title'
                 name='title'
                 onChange={this.handleChange('title')}
                 placeholder='Title'
                 type='text'
                 value={this.props.digital_asset.title}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control'
                    id='description'
                    name='description'
                    onChange={this.handleChange('description')}
                    placeholder='Enter a description'
                    value={this.props.digital_asset.description}></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Author</label>
          <input className='form-control'
                 id='author'
                 name='author'
                 onChange={this.handleChange('author')}
                 placeholder='Author'
                 type='text'
                 value={this.props.digital_asset.author}></input>
        </div>

        <LatLonMap lat={this.props.digital_asset.latitude}
                   lon={this.props.digital_asset.longitude}
                   onLocationSelected={this.handleLocationSelected} />

        <div className='form-group'>
          <label htmlFor='latitude'>Latitude</label>
          <input className='form-control'
                 id='latitude'
                 name='latitude'
                 onChange={this.handleChange('latitude')}
                 placeholder='Latitude'
                 step='any'
                 type='number'
                 value={this.props.digital_asset.latitude}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='longitude'>Longitude</label>
          <input className='form-control'
                 id='longitude'
                 name='longitude'
                 onChange={this.handleChange('longitude')}
                 placeholder='Longitude'
                 step='any'
                 type='number'
                 value={this.props.digital_asset.longitude}></input>
        </div>
        <button className='btn btn-default'
                disabled={this.props.isSubmitting}
                type='submit'>Save!</button>
      </form>
    );
  }
};

DigitalAssetForm.propTypes = {
  change_digital_asset_form: React.PropTypes.function,
  create_digital_asset: React.PropTypes.function,
  digital_asset: React.PropTypes.object,
  dropzone: React.PropTypes.object,
  dropzone_file_stats: React.PropTypes.object,
  dropzone_load_success: React.PropTypes.function,
  dropzone_upload_success: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool
};

export default DigitalAssetForm;
