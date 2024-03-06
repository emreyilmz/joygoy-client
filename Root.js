import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import LanguageScreen from "./src/components/language/language";
import RootScreen from "./src/navigation/main/index.js";
import { useSelector, useDispatch ,shallowEqual} from "react-redux";
import { Init,GetLanguage } from "./src/store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from 'react-i18next'

const Root = () => {
    const [isloggedin, setLogged] = useState(false);
    const [loading,setLoading] = useState(false)
    console.log(isloggedin);
    const token = useSelector((state) => state.AuthReducers.authToken,shallowEqual);
    const authLanguage = useSelector((state) => state.AuthReducers.authLanguage,shallowEqual);
    /* const {t,i18n} = useTranslation() */
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    const dispatch = useDispatch();
    
    const myFunction = async () => {
        
        await dispatch(GetLanguage())
       

        await dispatch(Init());
        console.log(authLanguage)
        
        setLoading(true)
        
            
            
       
    };

    useEffect(() => {
        
        myFunction();
    });

    useEffect(() => {
        
        myFunction();
    },[authLanguage,token]);
    return (
        <View style={styles.container}>
            
            {
            loading?
            authLanguage==null ? <LanguageScreen /> : <RootScreen />
        :<View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <ActivityIndicator
            animating={animating}
            color="black"
            size="large"
            style={styles.activityIndicator}
        />
        <Text>Loading</Text>
    </View>}
            
        </View>
    );
};

export default Root;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
