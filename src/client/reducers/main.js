const reducers = {
  VALIDATING_CSRF: ({ ...state }, { now }) => ({
    ...state,
    validateCSRFAt: now,
  }),
  VALIDATED_CSRF: ({ ...state }, { response }) => ({
    ...state,
    csrfResponse: response,
  }),
  FETCHING_FLICKR_RECENTS: ({ busy, ...state }) => ({
    ...state,
    busy: {
      ...busy,
      flickrRecents: true,
    },
  }),
  FETCHED_FLICKR_RECENTS: ({ xhr, busy, ...state }, { response }) => ({
    ...state,
    busy: {
      ...busy,
      flickrRecents: false,
    },
    xhr: {
      ...xhr,
      flickrRecents: response,
    },
  }),
};

export default (state = {}, action) =>
  reducers && reducers[action.type] ? reducers[action.type](state, action) : state;
