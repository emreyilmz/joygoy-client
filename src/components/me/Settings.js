import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import { FontAwesome, Feather,Ionicons,MaterialCommunityIcons   } from "@expo/vector-icons";
import { Logout } from "../../store/actions";
import { useDispatch } from "react-redux";
import DeleteUserPopup from "./DeleteUserPopup";
import { Provider, useSelector } from "react-redux";
import {useTranslation} from 'react-i18next'

const Settings = ({ route,navigation }) => {
    const dispatch = useDispatch();
    const user = route.params.params.user;
    console.log(user)
    const {t,i18n} = useTranslation()

    const token = useSelector((state) => state.AuthReducers.authToken);
    //console.log(props)
    /* console.log(text, id); */


    const popupRef = React.createRef();

    const settings = () => {
        dispatch(Logout())
        navigation.goBack()
        popupRef.current.close();
    }

    const onShowPopup = () => {
        console.log("hello")
        popupRef.current.show();
    };

    const onClosePopup = () => {
        popupRef.current.close();
    };


    return (
        <View style={styles.container}>
            <View style={[styles.profile,{
        padding:20,width:"90%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}]}>
            <TouchableOpacity
             onPress={() =>settings()} //submit
            >
            <View style={styles.settingsGroup}>
            <Ionicons name="exit" size={24} color="green" />
            <Text style={styles.textSettings}>{t('Settings_Exit')}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShowPopup()}>
            <View style={styles.settingsGroup}>
            <MaterialCommunityIcons name="delete-circle" size={24} color="green" />
            <Text style={styles.textSettings}>{t('Settings_Delete')}</Text>
            </View>
            
            </TouchableOpacity>
            <DeleteUserPopup
                            ref={popupRef}
                            onTouchOutside={onClosePopup}
                            title={"Add List"}
                            user={user}
                        />
        </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:200
    },
    settingsGroup:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:25,
    },
    textSettings:{
        fontWeight:"bold",
        fontSize:22,
        letterSpacing:1,
        marginLeft:10
    },
});
