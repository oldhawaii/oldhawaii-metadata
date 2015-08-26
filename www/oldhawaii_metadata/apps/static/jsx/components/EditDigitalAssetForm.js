'use strict';

import React from 'react';
import DigitalAssetForm from './DigitalAssetForm';

class EditDigitalAssetForm extends DigitalAssetForm {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSelected = this.handleLocationSelected.bind(this);
  }

  displayName() {
    return 'EditDigitalAssetForm';
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.load_digital_asset(this.props.digital_asset_id);
  }

  submit(event) {
    event.preventDefault();
    this.props.update_digital_asset(this.props.digital_asset);
  }
};

DigitalAssetForm.propTypes = {
  change_digital_asset_form: React.PropTypes.function,
  change_digital_asset_form_from_map: React.PropTypes.function,
  create_digital_asset: React.PropTypes.function,
  digital_asset: React.PropTypes.object,
  dropzone: React.PropTypes.object,
  dropzone_file_stats: React.PropTypes.object,
  dropzone_load_success: React.PropTypes.function,
  dropzone_upload_success: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool,
  load_digital_asset: React.PropTypes.function
};

export default EditDigitalAssetForm;
