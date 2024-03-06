import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
const axios = require("axios");
import MyWordsItem from "./MyWordsItem";
import AddPopup from "./AddPopup";
import { Provider, useSelector } from "react-redux";
import {useTranslation} from 'react-i18next'

const MyWords = (props) => {
    const id = props.route.params;
    const [words, setWords] = useState([]);
    console.log("1111", id);
    const token = useSelector((state) => state.AuthReducers.authToken);
    const {t,i18n} = useTranslation()

    const popupRef = React.createRef();

    const onShowPopup = () => {
        popupRef.current.show();
    };

    const onClosePopup = () => {
        popupRef.current.close();
    };

    //console.log(props.route.params.props.id);
    //console.log("hello", words);

    const getMoreData = () => {
        console.log("useEffect:", id);
        axios
            .get("http://3.73.129.160:8080/myword", { params: { id } })
            .then(function (result) {
                console.log(result.data);
                setWords(result.data.word);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getMoreData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Words</Text>
                <View style={{ width: "100%" }}>
                    <TouchableOpacity
                        onPress={onShowPopup}
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
                            {t("Word_Add")}
                        </Text>
                    </TouchableOpacity>
                    <AddPopup
                        ref={popupRef}
                        onTouchOutside={onClosePopup}
                        title={t('AddWord')}                    
                        id={id}
                        getMoreData={getMoreData}
                    />
                </View>
                <View style={styles.items}>
                    {/* {console.log("*******", words)} */}
                    {words.map((word, stepIndex) => (
                        <MyWordsItem
                            key={word._id}
                            item={word}
                            Index={stepIndex}
                            words={words}
                            getMoreData={getMoreData}
                        />
                    ))}

                    {/* <WordsItem item={"delete"} Index={6} /> */}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        //marginTop: Constants.statusBarHeight,
    },
    tasksWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    items: {
        marginTop: 30,
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
});

export default MyWords;
