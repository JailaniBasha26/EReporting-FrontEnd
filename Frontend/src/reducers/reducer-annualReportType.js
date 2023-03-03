const INITIAL_STATE = {
  annualReportType: { values: [], error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  return {
    ...state,
    annualReportType: { values: action.payload, error: null, loading: true },
  };
}
