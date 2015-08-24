'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import EditSourceFormContainer from './containers/EditSourceFormContainer';
import SourceFormContainer from './containers/SourceFormContainer';

const store = configureStore();
const sourceFormElement = document.getElementById('source_form');

document.addEventListener('DOMContentLoaded', function () {
  if (sourceFormElement.hasAttribute('data-source-id')) {
    const id = sourceFormElement.getAttribute('data-source-id');
    React.render(
      <Provider store={store}>
        {() => <EditSourceFormContainer source_id={id}/>}
      </Provider>,
      sourceFormElement
    );
  } else {
    React.render(
      <Provider store={store}>
        {() => <SourceFormContainer />}
      </Provider>,
      sourceFormElement
    );
  }
});
