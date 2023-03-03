const INITIAL_STATE = {
  companyInformation: { values: [], error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  return {
    ...state,
    companyInformation: { values: action.payload, error: null, loading: true },
  };
}
