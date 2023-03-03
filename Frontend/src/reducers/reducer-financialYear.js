const INITIAL_STATE = {
  financialYear: { values: [], error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  return {
    ...state,
    financialYear: { values: action.payload, error: null, loading: true },
  };
}
