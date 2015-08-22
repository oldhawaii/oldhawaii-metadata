'use strict';

import React from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import SourceFormContainer from './containers/SourceFormContainer';
import EditSourceFormContainer from './containers/EditSourceFormContainer';

const store = configureStore();
const sourceFormElement = document.getElementById('source_form');

document.addEventListener('DOMContentLoaded', function () {
  if (sourceFormElement.hasAttribute('data-source-id')) {
    const sourceId = sourceFormElement.getAttribute('data-source-id');
    React.render(
      <Provider store={store}>
        {() => <EditSourceFormContainer source_id={sourceId}/>}
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
