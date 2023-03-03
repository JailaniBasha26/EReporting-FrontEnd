const INITIAL_STATE = {
  incomeStatement: { values: [], error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  return {
    ...state,
    incomeStatement: { values: action.payload, error: null, loading: true },
  };
}
