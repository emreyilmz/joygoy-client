import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { Login } from "../../store/actions";
import axios from "axios";
import {useTranslation} from 'react-i18next'

const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const dispatch = useDispatch();
    const {t,i18n} = useTranslation()
    

    const sendCred = async () => {
        console.log(data.email, data.password);
        axios
            .post("http://3.73.129.160:8080/signin", {
                email: data.email,
                password: data.password,
            })
            .then(async function (result) {
                try {
                    console.log("girdi 2");

                    console.log(result.data.token);
                    await AsyncStorage.setItem("token", result.data.token);

                    const value = await AsyncStorage.getItem("token");
                    console.log("token", value);
                    console.log("value", value);
                    dispatch(Login(value));
                } catch (e) {
                    console.log(e);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const textInputChange = (val) => {
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
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
                    {/* <TouchableOpacity>
                        <Text style={{ color: "#1DB954", marginTop: 15 }}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity> */}

                    <View style={styles.button}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={[styles.signIn]}
                                onPress={() => {
                                    sendCred();
                                }}
                            >
                                <LinearGradient
                                    colors={["#1DB954", "#01ab9d"]}
                                    style={styles.signIn}
                                >
                                    <Text
                                        style={[
                                            styles.textSign,
                                            {
                                                color: "#fff",
                                            },
                                        ]}
                                    >
                                        {t('SignIn')}

                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("SignUpScreen")
                                }
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

export default SignInScreen;

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
});
