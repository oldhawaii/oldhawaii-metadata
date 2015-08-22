'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import DigitalAssetFormContainer from './containers/DigitalAssetFormContainer';

const store = configureStore();
const mainElement = document.getElementById('main');

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <Provider store={store}>
      {() => <DigitalAssetFormContainer />}
    </Provider>,
    mainElement
  );
});
