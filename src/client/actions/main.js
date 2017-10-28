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
  return (dispatch) => {
    dispatch(validatingCSRF());

    Api.post({
      path: '/validate-csrf',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      payload,
    })
      .then(response => response.json())
      .then((response) => {
        dispatch(validatedCSRF(response));
      });
  };
}
