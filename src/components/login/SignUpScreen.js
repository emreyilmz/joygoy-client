import React from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Login } from "../../store/actions";
import {useTranslation} from 'react-i18next'
import { useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidFormatEmail: true,
        isMatchPasswords: true,
        confirm_secureTextEntry: true,
        confirm_password: "",
        errorFlag: true,
        errorMessage: "",
    });
    const {t,i18n} = useTranslation()
    const language = useSelector((state) => state.AuthReducers.authLanguage);

    const dispatch = useDispatch();

    const sendCred = async () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                data.email
            )
        ) {
            setData({
                ...data,
                isValidFormatEmail: false,
            });
            return;
        } else {
            setData({
                ...data,
                isValidFormatEmail: true,
            });
        }

        if (data.password.length < 6 || data.password.length > 20) {
            setData({
                ...data,
                isValidPassword: false,
            });
            return;
        } else {
            setData({
                ...data,
                isValidPassword: true,
            });
        }

        if (data.confirm_password != data.password) {
            setData({
                ...data,
                isMatchPasswords: false,
            });
            return;
        } else {
            setData({
                ...data,
                isMatchPasswords: true,
            });
        }
        axios
            .post("http://3.73.129.160:8080/signup", {
                email: data.email,
                password: data.password,
                language:language
            })
            .then(async function (result, err) {
                try {
                    setData({
                        ...data,
                        errorMessage: "",
                        errorFlag: true,
                    });
                    await AsyncStorage.setItem("token", result.data.token);

                    const value = await AsyncStorage.getItem("token");

                    dispatch(Login(value));
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setData({
                        ...data,
                        errorFlag: false,
                        errorMessage: error.response.data.error,
                    });
                }
            });
    };

    const textInputChange = (val) => {
        setData({
            ...data,
            email: val,
        });

        if (val.length > 7) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>{t('LoginHeader')}</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        {/* <View style={styles.action_container}> */}
                        <FontAwesome name="user-o" size={20} color="#05375a" />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ? (
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    size={20}
                                    color="green"
                                />
                            </Animatable.View>
                        ) : null}
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}
                    >
                        Password
                    </Text>
                    <View style={styles.action}>
                        {/* <View style={styles.action_container}> */}
                        <Feather name="lock" size={20} color="#05375a" />

                        <TextInput
                            placeholder="Your Password"
                            style={styles.textInput}
                            secureTextEntry={
                                data.secureTextEntry ? true : false
                            }
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        {/* </View> */}
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? (
                                <Feather
                                    name="eye-off"
                                    size={20}
                                    color="grey"
                                />
                            ) : (
                                <Feather name="eye" size={20} color="grey" />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}
                    >
                        Confirm Password
                    </Text>
                    <View style={styles.action}>
                        {/* <View style={styles.action_container}> */}
                        <Feather name="lock" size={20} color="#05375a" />
                        <TextInput
                            placeholder="Confirm Your Password"
                            style={styles.textInput}
                            secureTextEntry={
                                data.secureTextEntry ? true : false
                            }
                            autoCapitalize="none"
                            onChangeText={(val) =>
                                handleConfirmPasswordChange(val)
                            }
                        />
                        {/* </View> */}
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? (
                                <Feather
                                    name="eye-off"
                                    size={20}
                                    color="grey"
                                />
                            ) : (
                                <Feather name="eye" size={20} color="grey" />
                            )}
                        </TouchableOpacity>
                    </View>

                    {data.isValidPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Password should be min 6 char and max 20 char
                            </Text>
                        </Animatable.View>
                    )}
                    {data.isValidFormatEmail ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Invalid Email Format
                            </Text>
                        </Animatable.View>
                    )}
                    {data.isMatchPasswords ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Password and confirm password should be same.
                            </Text>
                        </Animatable.View>
                    )}
                    {data.errorFlag ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                {data.errorMessage}
                            </Text>
                        </Animatable.View>
                    )}

                    <View style={styles.button}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={() => sendCred()}
                                style={[
                                    styles.signIn,
                                    {
                                        borderColor: "#1DB954",
                                        borderWidth: 1,
                                        marginTop: 15,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: "#1DB954",
                                        },
                                    ]}
                                >
                                    {t('SignUp')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1DB954",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 7,
        paddingBottom: 30,
    },
    footer: {
        flex: Platform.OS === "ios" ? 3 : 5,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18,
    },
    action: {
        //backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    /* action_container: {
        flexDirection: "row",
    }, */
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : 0,
        paddingLeft: 10,
        color: "#05375a",
        //marginLeft: 15,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textPrivate: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20,
    },
    color_textPrivate: {
        color: "grey",
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14,
    },
});
