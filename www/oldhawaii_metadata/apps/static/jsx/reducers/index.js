'use strict';

import * as actions from '../actions';
import DigitalAsset from '../models/DigitalAsset';
import Source from '../models/Source';

const initialDigitalAssetState = {
  digital_asset: new DigitalAsset(),
  dropzone: null,
  dropzone_file_stats: null,
  error: false,
  isSubmitting: false,
  source_options: []
};

export function digital_assets(state = initialDigitalAssetState, action) {
  switch (action.type) {
    case actions.LOADED_DIGITAL_ASSET_FORM_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        source_options: action.payload._items
      });
    case actions.LOADED_DIGITAL_ASSET_FORM_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    case actions.LOAD_DIGITAL_ASSET_SUCCESS:
      const load_da = new DigitalAsset();
      delete action.payload._links;
      delete action.payload._created;
      delete action.payload._updated;
      Object.assign(load_da, action.payload);
      load_da._id = action.payload._id;
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        digital_asset: load_da
      });
    case actions.LOAD_DIGITAL_ASSET_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    case actions.CHANGE_DIGITAL_ASSET_FORM:
      const new_da = new DigitalAsset();
      Object.assign(new_da, state.digital_asset);
      new_da[action.payload.key] = action.payload.value;
      return Object.assign({}, state, {
        error: action.error,
        digital_asset: new_da
      });
    case actions.CHANGE_DIGITAL_ASSET_FORM_FROM_MAP:
      const new_da_map = new DigitalAsset();
      Object.assign(new_da_map, state.digital_asset);
      new_da_map['latitude'] = action.payload.lat;
      new_da_map['longitude'] = action.payload.lng;
      return Object.assign({}, state, {
        error: action.error,
        digital_asset: new_da_map
      });
    case actions.CREATE_DIGITAL_ASSET:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        digital_asset: action.payload
      });
    case actions.CREATE_DIGITAL_ASSET_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        digital_asset: new DigitalAsset(),
        dropzone: null,
        dropzone_file_stats: null
      });
    case actions.CREATE_DIGITAL_ASSET_FAILURE:
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
      const new_with_image = new DigitalAsset();
      Object.assign(new_with_image, state.digital_asset);
      new_with_image['image_url'] = action.payload.image_url;
      new_with_image['image_width'] = action.payload.image_width;
      new_with_image['image_height'] = action.payload.image_height;
      return Object.assign({}, state, {
        dropzone_file_stats: action.payload,
        digital_asset: new_with_image,
        error: action.error
      });
    case actions.UPDATE_DIGITAL_ASSET:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        digital_asset: action.payload
      });
    case actions.UPDATE_DIGITAL_ASSET_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        digital_asset: action.payload
      });
    case actions.UPDATE_DIGITAL_ASSET_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    default:
      return state;
  }
}

const initialSourceState = {
  error: false,
  isSubmitting: false,
  source: new Source()
};

export function sources(state = initialSourceState, action) {
  switch (action.type) {
    case actions.LOAD_SOURCE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    case actions.LOAD_SOURCE_SUCCESS:
      const load_s = new Source(
          action.payload.name,
          action.payload.url,
          action.payload.email,
          action.payload.phone_number
        );
      load_s._id = action.payload._id;
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        source: load_s
      });
    case actions.LOAD_SOURCE_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    case actions.CHANGE_SOURCE_FORM:
      const new_s = new Source();
      Object.assign(new_s, state.source);
      new_s[action.payload.key] = action.payload.value;
      return Object.assign({}, state, {
        error: action.error,
        source: new_s
      });
    case actions.CREATE_SOURCE:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        source: action.payload
      });
    case actions.CREATE_SOURCE_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        source: new Source()
      });
    case actions.CREATE_SOURCE_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    case actions.UPDATE_SOURCE:
      return Object.assign({}, state, {
        isSubmitting: true,
        error: action.error,
        source: action.payload
      });
    case actions.UPDATE_SOURCE_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error,
        source: action.payload
      });
    case actions.UPDATE_SOURCE_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        error: action.error
      });
    default:
      return state;
  }
}
