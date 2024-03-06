import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem("token");
        if (token !== null) {
            console.log("token fetched");
            dispatch({
                type: "LOGIN",
                payload: token,
            });
        }
    };
};

export const Login = (value) => {
    return async (dispatch) => {
        token = value;
        // here we can use login api to get token and then store it
        await AsyncStorage.setItem("token", token);
        console.log("token stored");
        dispatch({
            type: "LOGIN",
            payload: token,
        });
    };
};
export const Logout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    };
};
export const SetLanguage = (value) => {
    return async (dispatch) => {
        language = value;
        // here we can use login api to get token and then store it
        await AsyncStorage.setItem("language", language);
        console.log("token stored");
        dispatch({
            type: "SETLANGUAGE",
            payload: language,
        });
    };

};


export const GetLanguage = () => {
    return async (dispatch) => {
        const language = await AsyncStorage.getItem("language");
        console.log("burası önemli",language)
        console.log(language)
        if (language !== null) {
            console.log("language fetched");
            
            dispatch({
                type: "GETLANGUAGE",
                payload: language,
            });
        }
    };
};

