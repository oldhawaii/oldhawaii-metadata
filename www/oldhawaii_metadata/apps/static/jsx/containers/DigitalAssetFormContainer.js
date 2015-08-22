'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DigitalAssetForm from '../components/DigitalAssetForm';
import * as DigitalAssetActions from '../actions';

function mapStateToProps(state) {
  const { digital_assets } = state;
  return digital_assets;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DigitalAssetActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DigitalAssetForm);
