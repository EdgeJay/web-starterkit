/* eslint-disable import/prefer-default-export */

export function getInitialState({ csrf = '', ...overrides } = {}) {
  return {
    main: {
      csrf,
      csrfResponse: '',
      enableCSRFTest: true,
      ...overrides,
      xhr: {
        flickrRecents: null,
      },
      busy: {
        flickrRecents: false,
      },
    },
  };
}
