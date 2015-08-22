'use strict';

import React from 'react';
import SourceForm from './SourceForm';

class EditSourceForm extends SourceForm {

  constructor(props) {
    super(props);
  }

  displayName() {
    return 'EditSourceForm';
  }

  componentDidMount() {
    this.props.load_source(this.props.source_id);
  }

  submit(event) {
    event.preventDefault();
    this.props.update_source(this.props.source);
  }
}

EditSourceForm.propTypes = {
  change_source_form: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool,
  load_source: React.PropTypes.function,
  source: React.PropTypes.object,
  update_source: React.PropTypes.function
};

export default EditSourceForm;
