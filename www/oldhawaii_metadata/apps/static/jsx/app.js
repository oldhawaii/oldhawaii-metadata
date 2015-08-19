'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import MetadataFormContainer from './containers/MetadataFormContainer';


const store = configureStore();
let mainElement = document.getElementById('main');

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <Provider store={store}>
      {() => <MetadataFormContainer />}
    </Provider>,
    mainElement
  )
});
