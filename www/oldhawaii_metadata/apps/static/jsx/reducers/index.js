'use strict';

import * as actions from '../actions';
import Metadata from '../models/Metadata';

const initialState = {
  isSubmitting: false,
  error: false,
  metadata: new Metadata()
};


export function metadatas(state=initialState, action) {
  switch (action.type) {
    case actions.CREATE_METADATA:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        metadata: action.payload
      });
    case actions.CREATE_METADATA_SUCCESS:
      let metadata = new Metadata();
      metadata.author = "FooMan";
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        metadata: metadata
      });
    case actions.CREATE_METADATA_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    default:
      return state;
  }
}
