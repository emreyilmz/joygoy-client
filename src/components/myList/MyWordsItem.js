import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const WordItemLıst = ({ item, words, Index, getMoreData }) => {
    const navigation = useNavigation();
    const word = item.word;
    const token = useSelector((state) => state.AuthReducers.authToken);

    //console.log(item.word);
    //words.map((word) => console.log(word));

    const wordObj = item;

    const deleteWord = (id) => {
        console.log(id);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios
            .delete(`http://3.73.129.160:8080/deletemyword/${id}`, config)
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
                alignItems: "center",
                marginBottom: 8,
            }}
        >
            <TouchableOpacity
                key={item._id}
                style={styles.item}
                onPress={() => {
                    navigation.navigate("MyPost", {
                        params: { word, item, words, Index },
                    });
                }}
            >
                <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text style={styles.itemText}>
                        {Index} - {item.word}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                    deleteWord(item._id);
                }}
            >
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 11,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        /* marginBottom: 8, */
        width: "92%",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 8,
        height: 8,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 2,
        marginRight: 12,
    },
    itemText: {
        maxWidth: "80%",
        letterSpacing: 0.6,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default WordItemLıst;
