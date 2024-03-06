import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import axios from "axios";

const MyList = ({ props, text, id, getMoreData }) => {
    const token = useSelector((state) => state.AuthReducers.authToken);
    //console.log(props)
    const navigation = useNavigation();
    /* console.log(text, id); */

    const deletePost = (postid) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios
            .delete(`http://3.73.129.160:8080/deletemylist/${postid}`, config)
            .then(() => getMoreData())
            .catch(() => {
                console.log("error");
            });
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                height: 55,
                marginBottom: 10,
            }}
        >
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.navigate("MyWords", id);
                }}
            >
                <View style={styles.itemLeft}>
                    <View
                        style={[styles.square, { backgroundColor: "red" }]}
                    ></View>
                    <Text style={styles.itemText}>{text}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                    deletePost(id);
                }}
            >
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        /*  marginBottom: 20, */
        width: "90%",
        height: "100%",
    },
    square: {
        width: 24,
        height: 24,
        //backgroundColor:'#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },

    itemText: {
        maxWidth: "80%",
        fontWeight: "bold",
    },
    circular: {
        width: 12,
        height: 12,
        //borderColor:'#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonSecondary2: {
        flex: 1,
        flexDirection: "row",
        borderColor: "white",
        borderWidth: 3,
        width: "100%",
        alignItems: "flex-start",
        textAlign: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 12,
        /* margin: 10, */
        marginVertical: 10,
    },
    buttonSecondaryText2: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default MyList;
