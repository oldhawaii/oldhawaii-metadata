import request from 'superagent';

export const CREATE_METADATA = 'CREATE_METADATA';
export const CREATE_METADATA_SUCCESS = 'CREATE_METADATA_SUCCESS';
export const CREATE_METADATA_FAILURE = 'CREATE_METADATA_FAILURE';

export function create_metadata(metadata) {
  return dispatch => {
    const data = JSON.parse(JSON.stringify(metadata));
    request.post('/api/metadatas/')
           .send(data)
           .end(function (err, res) {
              if (err) {
              } else if (res.ok) {
                dispatch(create_metadata_success(metadata));
              } else {
              }
            });
  };
}

export function create_metadata_success(response) {
  return {
    type: CREATE_METADATA_SUCCESS,
    payload: response,
    error: false
  };
}

export function create_metadata_failure(response) {
  return {
    type: CREATE_METADATA_FAILURE,
    payload: response,
    error: true
  };
}
