const reducers = {
  PRELOAD_APP: ({ ...state }, { preload }) => ({
    ...state,
    ...preload,
  }),
};

export default (state = {}, action) => (
  reducers && reducers[action.type] ? reducers[action.type](state, action) : state
);
