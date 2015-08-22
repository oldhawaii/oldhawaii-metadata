'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import SourceFormContainer from './containers/SourceFormContainer';

const store = configureStore();
const sourceFormElement = document.getElementById('source_form');

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <Provider store={store}>
      {() => <SourceFormContainer />}
    </Provider>,
    sourceFormElement
  );
});
