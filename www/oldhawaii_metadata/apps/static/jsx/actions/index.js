import request from 'superagent';

export const LOADED_DIGITAL_ASSET_FORM = 'LOADED_DIGITAL_ASSET_FORM';
export const LOADED_DIGITAL_ASSET_FORM_SUCCESS =
'LOADED_DIGITAL_ASSET_FORM_SUCCESS';
export const LOADED_DIGITAL_ASSET_FORM_FAILURE =
'LOADED_DIGITAL_ASSET_FORM_FAILURE';
export const LOAD_DIGITAL_ASSET = 'LOAD_DIGITAL_ASSET';
export const LOAD_DIGITAL_ASSET_SUCCESS = 'LOAD_DIGITAL_ASSET_SUCCESS';
export const LOAD_DIGITAL_ASSET_FAILURE = 'LOAD_DIGITAL_ASSET_FAILURE';

export const CHANGE_DIGITAL_ASSET_FORM = 'CHANGE_DIGITAL_ASSET_FORM';
export const CHANGE_DIGITAL_ASSET_FORM_FROM_MAP =
  'CHANGE_DIGITAL_ASSET_FORM_FROM_MAP';
export const CREATE_DIGITAL_ASSET = 'CREATE_DIGITAL_ASSET';
export const CREATE_DIGITAL_ASSET_SUCCESS = 'CREATE_DIGITAL_ASSET_SUCCESS';
export const CREATE_DIGITAL_ASSET_FAILURE = 'CREATE_DIGITAL_ASSET_FAILURE';
export const UPDATE_DIGITAL_ASSET = 'UPDATE_DIGITAL_ASSET';
export const UPDATE_DIGITAL_ASSET_SUCCESS = 'UPDATE_DIGITAL_ASSET_SUCCESS';
export const UPDATE_DIGITAL_ASSET_FAILURE = 'UPDATE_DIGITAL_ASSET_FAILURE';

export const DROPZONE_LOAD_SUCCESS = 'DROPZONE_LOAD_SUCCESS';
export const DROPZONE_UPLOAD_SUCCESS = 'DROPZONE_UPLOAD_SUCCESS';

export const LOAD_SOURCE = 'LOAD_SOURCE';
export const LOAD_SOURCE_SUCCESS = 'LOAD_SOURCE_SUCCESS';
export const LOAD_SOURCE_FAILURE = 'LOAD_SOURCE_FAILURE';

export const CHANGE_SOURCE_FORM = 'CHANGE_SOURCE_FORM ';
export const CREATE_SOURCE = 'CREATE_SOURCE ';
export const CREATE_SOURCE_SUCCESS = 'CREATE_SOURCE_SUCCESS ';
export const CREATE_SOURCE_FAILURE = 'CREATE_SOURCE_FAILURE ';
export const UPDATE_SOURCE = 'UPDATE_SOURCE ';
export const UPDATE_SOURCE_SUCCESS = 'UPDATE_SOURCE_SUCCESS ';
export const UPDATE_SOURCE_FAILURE = 'UPDATE_SOURCE_FAILURE ';

// TODO: Use something like redux-action to get rid of codes
// TODO: Use something like redux-transducers to get rid of codes

function get_csrf_token_from_meta(csrf_meta_name = 'csrf-token',
  csrf_meta_attribute = 'content') {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === csrf_meta_name) {
        return metas[i].getAttribute(csrf_meta_attribute);
      }
    }
    return '';
  }

// DIGITAL ASSET FORM

export function loaded_digital_asset_form() {
  return dispatch => {
    request.get('/api/sources/')
           .end(function (err, res) {
              if (err) {
                dispatch(loaded_digital_asset_form_failure(err));
              } else if (res.ok) {
                dispatch(loaded_digital_asset_form_success(res));
              } else {
                dispatch(loaded_digital_asset_form_failure(err));
              }
            });
  };
}

export function loaded_digital_asset_form_success(response) {
  const sources = JSON.parse(response.xhr.responseText);
  return {
    type: LOADED_DIGITAL_ASSET_FORM_SUCCESS,
    payload: sources,
    error: false
  };
}

export function loaded_digital_asset_form_failure(error) {
  return {
    type: LOADED_DIGITAL_ASSET_FORM_FAILURE,
    payload: error,
    error: true
  };
}

export function load_digital_asset(digital_asset_id) {
  return dispatch => {
    request.get('/api/digital_assets/' + digital_asset_id)
           .end(function (err, res) {
              if (err) {
                dispatch(load_digital_asset_failure(err));
              } else if (res.ok) {
                dispatch(load_digital_asset_success(res));
              } else {
                dispatch(load_digital_asset_failure(err));
              }
            });
  };
}

export function load_digital_asset_success(response) {
  const source = JSON.parse(response.xhr.responseText);
  return {
    type: LOAD_DIGITAL_ASSET_SUCCESS,
    payload: source,
    error: false
  };
}

export function load_digital_asset_failure(error) {
  return {
    type: LOAD_DIGITAL_ASSET_FAILURE,
    payload: error,
    error: true
  };
}

export function change_digital_asset_form(key, value) {
  return {
    type: CHANGE_DIGITAL_ASSET_FORM,
    payload: {key: key, value: value},
    error: false
  };
}

export function change_digital_asset_form_from_map(lat, lng) {
  return {
    type: CHANGE_DIGITAL_ASSET_FORM_FROM_MAP,
    payload: {lat: lat, lng: lng},
    error: false
  };
}

export function create_digital_asset(digital_asset) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(digital_asset));
    const csrf_token = get_csrf_token_from_meta();
    request.post('/api/digital_assets/')
           .send(data)
           .set('X-CSRFToken', csrf_token)
           .end(function (err, res) {
              if (err) {
                dispatch(create_digital_asset_failure(digital_asset));
              } else if (res.ok) {
                dispatch(create_digital_asset_success(digital_asset));
              } else {
                dispatch(create_digital_asset_failure(digital_asset));
              }
            });
  };
}

export function create_digital_asset_success(response) {
  return {
    type: CREATE_DIGITAL_ASSET_SUCCESS,
    payload: response,
    error: false
  };
}

export function create_digital_asset_failure(response) {
  return {
    type: CREATE_DIGITAL_ASSET_FAILURE,
    payload: response,
    error: true
  };
}

export function dropzone_load_success(dropzone) {
  return {
    type: DROPZONE_LOAD_SUCCESS,
    payload: dropzone,
    error: false
  };
}

export function dropzone_upload_success(file) {
  const file_stats = (file) ? file.xhr.responseText : '';
  return {
    type: DROPZONE_UPLOAD_SUCCESS,
    payload: JSON.parse(file_stats),
    error: false
  };
}

export function update_digital_asset(digital_asset) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(digital_asset));
    const csrf_token = get_csrf_token_from_meta();
    request.put('/api/digital_assets/' + digital_asset._id)
           .set('X-CSRFToken', csrf_token)
           .send(data)
           .end(function (err, res) {
              if (err) {
              } else if (res.ok) {
                dispatch(update_digital_asset_success(digital_asset));
              } else {
                dispatch(update_digital_asset_failure(digital_asset));
              }
            });
  };
}

export function update_digital_asset_success(response) {
  return {
    type: UPDATE_DIGITAL_ASSET_SUCCESS,
    payload: response,
    error: false
  };
}

export function update_digital_asset_failure(response) {
  return {
    type: UPDATE_DIGITAL_ASSET_FAILURE,
    payload: response,
    error: true
  };
}

// SOURCE FORM

export function load_source(source_id) {
  return dispatch => {
    request.get('/api/sources/' + source_id)
           .end(function (err, res) {
              if (err) {
                dispatch(load_source_failure(err));
              } else if (res.ok) {
                dispatch(load_source_success(res));
              } else {
                dispatch(load_source_failure(err));
              }
            });
  };
}

export function load_source_success(response) {
  const source = JSON.parse(response.xhr.responseText);
  return {
    type: LOAD_SOURCE_SUCCESS,
    payload: source,
    error: false
  };
}

export function load_source_failure(error) {
  return {
    type: LOAD_SOURCE_FAILURE,
    payload: error,
    error: true
  };
}

export function change_source_form(key, value) {
  return {
    type: CHANGE_SOURCE_FORM,
    payload: {key: key, value: value},
    error: false
  };
}

export function create_source(source) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(source));
    const csrf_token = get_csrf_token_from_meta();
    request.post('/api/sources/')
           .send(data)
           .set('X-CSRFToken', csrf_token)
           .end(function (err, res) {
              if (err) {
              } else if (res.ok) {
                dispatch(create_source_success(source));
              } else {
                dispatch(create_source_failure(source));
              }
            });
  };
}

export function create_source_success(response) {
  return {
    type: CREATE_SOURCE_SUCCESS,
    payload: response,
    error: false
  };
}

export function create_source_failure(response) {
  return {
    type: CREATE_SOURCE_FAILURE,
    payload: response,
    error: true
  };
}

export function update_source(source) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(source));
    const csrf_token = get_csrf_token_from_meta();
    request.put('/api/sources/' + source._id)
           .set('X-CSRFToken', csrf_token)
           .send(data)
           .end(function (err, res) {
              if (err) {
              } else if (res.ok) {
                dispatch(update_source_success(source));
              } else {
                dispatch(update_source_failure(source));
              }
            });
  };
}

export function update_source_success(response) {
  return {
    type: UPDATE_SOURCE_SUCCESS,
    payload: response,
    error: false
  };
}

export function update_source_failure(response) {
  return {
    type: UPDATE_SOURCE_FAILURE,
    payload: response,
    error: true
  };
}

