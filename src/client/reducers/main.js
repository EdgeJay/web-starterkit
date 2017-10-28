const reducers = {
  VALIDATING_CSRF: ({ ...state }, { now }) => ({
    ...state,
    validateCSRFAt: now,
  }),
  VALIDATED_CSRF: ({ ...state }, { response }) => ({
    ...state,
    csrfResponse: response,
  }),
};

export default (state = {}, action) => (
  reducers && reducers[action.type] ? reducers[action.type](state, action) : state
);
