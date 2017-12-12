import Api from '../utils/Api';

export function changeGreeting(greeting) {
  return {
    type: 'CHANGE_GREETING',
    greeting,
  };
}

function validatingCSRF() {
  return {
    type: 'VALIDATING_CSRF',
    enableCSRFTest: false,
    now: +new Date(),
  };
}

function validatedCSRF(response) {
  return {
    type: 'VALIDATED_CSRF',
    enableCSRFTest: true,
    response,
  };
}

export function validateCSRF(payload) {
  return dispatch => {
    dispatch(validatingCSRF());

    Api.post({
      path: '/validate-csrf',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      payload,
    })
      .then(response => response.json())
      .then(response => {
        dispatch(validatedCSRF(response));
      });
  };
}

function fetchingFlickrRecents() {
  return {
    type: 'FETCHING_FLICKR_RECENTS',
  };
}

function fetchedFlickrRecents(response) {
  return {
    type: 'FETCHED_FLICKR_RECENTS',
    response,
  };
}

export function fetchFlickrRecents() {
  return dispatch => {
    dispatch(fetchingFlickrRecents());

    const url = '/flickr-recents?per_page=12&page=1';
    const opts = {
      method: 'GET',
    };

    fetch(url, opts)
      .then(response => response.json())
      .then(response => dispatch(fetchedFlickrRecents(response)));
  };
}
