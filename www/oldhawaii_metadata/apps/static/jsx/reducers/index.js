'use strict';

import * as actions from '../actions';
import Metadata from '../models/Metadata';

const initialState = {
  dropzone: null,
  dropzone_file_stats: null,
  error: false,
  isSubmitting: false,
  metadata: new Metadata()
};

export function metadatas(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_METADATA_FORM:
      const new_metadata_state = new Metadata();
      Object.assign(new_metadata_state, state.metadata);
      new_metadata_state[action.payload.key] = action.payload.value;
      return Object.assign({}, state, {
        error: action.error,
        metadata: new_metadata_state
      });
    case actions.CREATE_METADATA:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        metadata: action.payload
      });
    case actions.CREATE_METADATA_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        metadata: new Metadata()
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
        dropzone_file_stats: action.payload,
        error: action.error
      });
    default:
      return state;
  }
}
