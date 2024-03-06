import {
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useImperativeHandle } from "react";
import { Provider, useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/actions";
import { useNavigation } from "@react-navigation/native";
import {useTranslation} from 'react-i18next'


const deviceHeight = Dimensions.get("window").height;

const DeleteUserPopup = React.forwardRef(
    ({ props, onTouchOutside, user  }, ref) => {
        console.log("burası",user._id)
        const [text, onChangeText] = React.useState("");
    const navigation = useNavigation();

    
    const {t,i18n} = useTranslation()

        const token = useSelector((state) => state.AuthReducers.authToken);
        /* const inputRef = useRef(); */
        const [showB, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
            show,
            close,
        }));
        console.log(text);

        const dispatch = useDispatch();

        

        
    const deleteUser = (userId) => {
        console.log(token)
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios
            .delete(`http://3.73.129.160:8080/deleteUser/${userId}`, config)
            .then(() => 
                       {
                         dispatch(Logout())
                         navigation.goBack()
                        }
                    
                    
                
            
            )
            .catch(() => {
                console.log("error");
            });
            
    };

        const textInputChange = (val) => {
            console.log(val);
            onChangeText(val);
        };

        const show = () => {
            setShow(true);
            console.log("hello");
        };
        const close = () => {
            setShow(false);
            console.log("hello");
        };

        const renderOutsideToucable = (onTouch) => {
            const view = <View style={{ flex: 1, width: "100%" }} />;
            if (!onTouch) return view;

            return (
                <TouchableWithoutFeedback
                    onPress={onTouch}
                    style={{ flex: 1, width: "100%" }}
                >
                    {view}
                </TouchableWithoutFeedback>
            );
        };

        const renderTitle = () => {
            return (
                <View>
                    <Text
                        style={{
                            color: "#182E44",
                            fontSize: 20,
                            fontWeight: "500",
                            margin: 15,
                        }}
                    >
                       {t('Settings_Delete_Desc')}

                    </Text>
                </View>
            );
        };

        const renderContent = () => {
            return (
                <View style={{ height: 150, flexDirection: "column" }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => onTouchOutside()}>
                                <LinearGradient
                                    colors={["#1DB954", "#01ab9d"]}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                    {t('Settings_Delete_No')}
                                    </Text>
                                </LinearGradient>
                    
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteUser(user._id)}>
                                <LinearGradient
                                    colors={["red", "#d20962"]}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                    {t('Settings_Delete_Yes')}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={showB}
                onRequestClose={close}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#000000AA",
                        justifyContent: "flex-end",
                    }}
                >
                    {renderOutsideToucable(onTouchOutside)}
                    <View
                        style={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingHorizontal: 10,
                            maxHeight: deviceHeight * 0.4,
                        }}
                    >
                        {renderTitle()}
                        {renderContent()}
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        flexDirection:"row",
        justifyContent:"space-between",
        margin: 15,

        /* backgroundColor: "red", */
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
    },
    textSign: {
        color: "white",
        fontWeight: "bold",
    },
});

export default DeleteUserPopup;
