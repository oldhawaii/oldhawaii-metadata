import request from 'superagent';

export const CHANGE_DIGITAL_ASSET_FORM = 'CHANGE_DIGITAL_ASSET_FORM';
export const CREATE_DIGITAL_ASSET = 'CREATE_DIGITAL_ASSET';
export const CREATE_DIGITAL_ASSET_SUCCESS = 'CREATE_DIGITAL_ASSET_SUCCESS';
export const CREATE_DIGITAL_ASSET_FAILURE = 'CREATE_DIGITAL_ASSET_FAILURE';
export const DROPZONE_LOAD_SUCCESS = 'DROPZONE_LOAD_SUCCESS';
export const DROPZONE_UPLOAD_SUCCESS = 'DROPZONE_UPLOAD_SUCCESS';

export function change_digital_asset_form(key, value) {
  return {
    type: CHANGE_DIGITAL_ASSET_FORM,
    payload: {key: key, value: value},
    error: false
  };
}

export function create_digital_asset(digital_asset) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(digital_asset));
    request.post('/api/digital_assets/')
           .send(data)
           .end(function (err, res) {
              if (err) {
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
