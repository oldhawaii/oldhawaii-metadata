'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import EditDigitalAssetFormContainer
  from './containers/EditDigitalAssetFormContainer';
import DigitalAssetFormContainer
  from './containers/DigitalAssetFormContainer';

const store = configureStore();
const daFormElement = document.getElementById('digital_asset_form');

document.addEventListener('DOMContentLoaded', function () {
  if (daFormElement.hasAttribute('data-digital-asset-id')) {
    const id = daFormElement.getAttribute('data-digital-asset-id');
    React.render(
      <Provider store={store}>
        {() => <EditDigitalAssetFormContainer digital_asset_id={id}/>}
      </Provider>,
      daFormElement
    );
  } else {
    React.render(
      <Provider store={store}>
        {() => <DigitalAssetFormContainer />}
      </Provider>,
      daFormElement
    );
  }
});
