const initialState = {
  title: '',
};

const reducers = {
  PRELOAD_APP: ({ ...state }, { preload }) => ({
    ...state,
    ...preload,
  }),
};

export default (state = initialState, action) => (
  reducers && reducers[action.type] ? reducers[action.type](state, action) : state
);
