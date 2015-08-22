'use strict';

import React from 'react';

class SourceForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  displayName() {
    return 'SourceForm';
  }

  handleChange(key) {
    return function (e) {
      this.props.change_source_form(key, e.target.value);
    }.bind(this);
  }

  submit(event) {
    event.preventDefault();
    this.props.create_source(this.props.source);
  }

  // Should break into tiny components, but I'm lazy.
  render() {
    return (
      <form onSubmit={this.submit} role='form'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input className='form-control'
                 id='name'
                 onChange={this.handleChange('name')}
                 placeholder='Name'
                 type='text'
                 value={this.props.source.name}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>URL</label>
          <input className='form-control'
                 id='url'
                 onChange={this.handleChange('url')}
                 placeholder='URL'
                 type='text'
                 value={this.props.source.url}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input className='form-control'
                 id='email'
                 onChange={this.handleChange('email')}
                 placeholder='Email'
                 type='text'
                 value={this.props.source.email}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='phone_number'>Phone</label>
          <input className='form-control'
                 id='phone_number'
                 onChange={this.handleChange('phone_number')}
                 placeholder='Phone'
                 type='phone'
                 value={this.props.source.phone_number}></input>
        </div>
        <button className='btn btn-default'
                disabled={this.props.isSubmitting}
                type='submit'>Save!</button>
      </form>
    );
  }
};

SourceForm.propTypes = {
  change_source_form: React.PropTypes.function,
  create_source: React.PropTypes.function,
  error: React.PropTypes.bool,
  isSubmitting: React.PropTypes.bool,
  source: React.PropTypes.object
};

export default SourceForm;
