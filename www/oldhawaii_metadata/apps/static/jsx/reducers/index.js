'use strict';

import * as actions from '../actions';
import Metadata from '../models/Metadata';

const initialState = {
  dropzone: null,
  dropzone_file_url: '',
  error: null,
  isSubmitting: false,
  metadata: new Metadata()
};

export function metadatas(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_METADATA:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        metadata: action.payload
      });
    case actions.CREATE_METADATA_SUCCESS:
      const metadata = new Metadata();
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
    case actions.DROPZONE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        dropzone: action.payload,
        error: action.error
      });
    case actions.DROPZONE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        dropzone_file_url: action.payload,
        error: action.error
      });
    default:
      return state;
  }
}
