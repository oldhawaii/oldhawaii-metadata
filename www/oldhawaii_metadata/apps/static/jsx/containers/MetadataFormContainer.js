'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MetadataForm from '../components/MetadataForm';
import * as MetadataActions from '../actions';

function mapStateToProps(state) {
  const { metadatas } = state;
  return metadatas;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MetadataActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataForm);
