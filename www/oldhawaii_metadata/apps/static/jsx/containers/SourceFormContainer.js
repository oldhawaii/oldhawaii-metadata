'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SourceForm from '../components/SourceForm';
import * as SourceActions from '../actions';

function mapStateToProps(state) {
  const { sources } = state;
  return sources;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SourceActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceForm);
