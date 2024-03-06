const initialState = {
    authToken: null,
    authLanguage:null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, //copy all previous states
                authToken: action.payload,
            };
        case "LOGOUT":
            return {
                authToken: null,
            };
        case "SETLANGUAGE":
            return {
                ...state,
                authLanguage:action.payload
            }
        case "GETLANGUAGE":
            return {
                ...state,
                authLanguage:action.payload
            };
           
        default:
            return state;
    }
};
