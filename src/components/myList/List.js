/*
_id
list_name
list_color
UserId
*/
import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector } from "react-redux";
import MyList from "./MyList";
import BottomPopup from "./BottomPopup";
import {useTranslation} from 'react-i18next'

const List = () => {
    const [lists, setLists] = useState([]);
    const token = useSelector((state) => state.AuthReducers.authToken);
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);
    const {t,i18n} = useTranslation()

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    const popupRef = React.createRef();

    const onShowPopup = () => {
        popupRef.current.show();
    };

    const onClosePopup = () => {
        popupRef.current.close();
    };

    const getMoreData = () => {
        closeActivityIndicator();
        console.log(token)
        console.log("geldi");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
            .get("http://3.73.129.160:8080/mylistGet", config)
            .then(function (result) {
                setLoading(true);
                console.log(result.data)
                setLists(result.data.lists);
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
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>My Word Lists</Text>
                    <View style={{ width: "100%" }}>
                        {/* <TouchableOpacity
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
                                Add List
                            </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => onShowPopup()}
                            style={[
                                styles.buttonPrimary3,
                                { flexDirection: "row" },
                            ]}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                {t('AddList')}

                            </Text>

                            <Entypo
                                style={{ marginLeft: 18 }}
                                name="squared-plus"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <BottomPopup
                            ref={popupRef}
                            onTouchOutside={onClosePopup}
                            title={t('AddList')}
                            getMoreData={getMoreData}
                        />
                    </View>
                    {loading ? (
                        <View style={styles.items}>
                            {lists.map((list, stepIndex) => (
                                <MyList
                                    key={list._id}
                                    text={list.name}
                                    color={list.color}
                                    id={list._id}
                                    getMoreData={getMoreData}
                                />
                            ))}
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator
                                animating={animating}
                                color="#bc2b78"
                                size="large"
                                style={styles.activityIndicator}
                            />
                            <Text>Loading..</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        /* padding: 20, */
        /* alignItems: "center", */
        paddingTop: 20,
    },
    tasksWrapper: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: "black",
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
    buttonPrimary3: {
        marginTop: 15,
        backgroundColor: "#1DB954",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: 5,
        padding: 15,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
    },
});
