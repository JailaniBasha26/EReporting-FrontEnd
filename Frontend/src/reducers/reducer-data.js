const INITIAL_STATE = {
    stateDataStore:{ values:[], error: null, loading: false, list:[]}
};

export default function (state = INITIAL_STATE, action) {
    return { ...state, values: action.payload,list:null }
}