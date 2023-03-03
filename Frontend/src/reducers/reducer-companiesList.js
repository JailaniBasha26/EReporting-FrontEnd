const INITIAL_STATE = {
    companiesList:{ companyList:[], error: null, loading: false}
};

export default function (state = INITIAL_STATE, action) {
    return { ...state, companyList: action.payload }
}