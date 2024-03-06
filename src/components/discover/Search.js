import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//import { TextInput } from "react-native-paper";

const Search = ({ navigation }) => {
    const hello = "hello";
    const [text, setSearch] = useState("");
    //const navigation = useNavigation();

    const searchInputChange = (val) => {
        console.log(val);
        setSearch(val);
        console.log("text:" + text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.footer}>
                <TextInput
                    style={styles.textInput}
                    onKeyPress={(keyPress) => console.log(keyPress)}
                    placeholder="Type here to translate!"
                    onChangeText={(val) => searchInputChange(val)}
                    value={text}
                    autoFocus
                    onSubmitEditing={() =>  navigation.navigate("SearchScreen", {
                        params: { text },
                    })}

                />
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate("SearchScreen", {
                            params: { text },
                        });
                    }}
                    style={{
                        color: "red",
                        padding: 5,
                    }}
                >
                    <FontAwesome
                        style={{
                            padding: 5,
                        }}
                        name="search"
                        size={28}
                        color="grey"
                    />
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    footer: {
        width: Dimensions.get("window").width,
        height: 70,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: Dimensions.get("window").width - 60,

        margin: 10,
        backgroundColor: "lightgray",
        padding: 5,
        borderRadius: 4,
    },
});
