import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const GrammerList = (props) => {
    const navigation = useNavigation();
    const { name, regex, id, color } = props;

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.navigate("GrammerPost", {
                        params: { id, name, regex, id, color },
                    });
                }}
            >
                <View style={styles.itemLeft}>
                    <View
                        style={[
                            styles.square,
                            {
                                backgroundColor: color,
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        ]}
                    >
                        {color == "green" ? (
                            <FontAwesome name="plus" size={14} color="black" />
                        ) : null}
                        {color == "red" ? (
                            <FontAwesome name="minus" size={14} color="black" />
                        ) : null}

                        {color == "blue" ? (
                            <FontAwesome
                                name="question"
                                size={14}
                                color="black"
                            />
                        ) : null}
                    </View>
                    <Text style={[styles.itemText]}>{props.name}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 24,
        height: 24,
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: "100%",
        fontWeight: "bold",
    },
    circular: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default GrammerList;
