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
const deviceHeight = Dimensions.get("window").height;
import {useTranslation} from 'react-i18next'

const BottomPopup = React.forwardRef(
    ({ props, onTouchOutside, title, getMoreData }, ref) => {
        const [text, onChangeText] = React.useState("");
        const token = useSelector((state) => state.AuthReducers.authToken);
        /* const inputRef = useRef(); */
        const [showB, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
            show,
            close,
        }));
        console.log(text);
        const {t,i18n} = useTranslation()

        const sendCred = () => {
            console.log("sendCred",text);
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            axios
                .post(
                    "http://3.73.129.160:8080/mylist",
                    {
                        name: text,
                        color: "#753088",
                    },
                    config
                )
                .then(function (result) {
                    /* setLists(result.data.lists); */
                    console.log("ali::", result.message);
                    getMoreData();
                    onTouchOutside();
                })
                .catch((err) => {
                    console.log(err);
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
                        {title}
                    </Text>
                </View>
            );
        };

        const renderContent = () => {
            return (
                <View style={{ height: 200, flexDirection: "column" }}>
                    <TextInput
                        style={{
                            margin: 15,
                            height: 40,
                            borderColor: "#1DB954",
                            borderWidth: 1,
                            paddingLeft: 15,
                            borderRadius: 10,
                        }}
                        onChangeText={(val) => textInputChange(val)}
                        value={text}
                        placeholder={t('AddList_Place')}

                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => sendCred()}>
                                <LinearGradient
                                    colors={["#1DB954", "#01ab9d"]}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                        {t('AddList')}
                                    </Text>
                                    <MaterialIcons
                                        name="add"
                                        size={20}
                                        color="#fff"
                                    />
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
        alignItems: "flex-end",
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

export default BottomPopup;
