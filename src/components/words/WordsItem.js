import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WordItemLıst = ({ item, words,words2,index }) => {
    const navigation = useNavigation();
    const word = item.word;
    //console.log(item.word);
    //words.map((word) => console.log(word));

    const wordObj = item;
    //console.log("adsasdsad dasassda", words);
    return (
        <TouchableOpacity
        key={item.index}
        style={styles.item}
        onPress={() => {
            navigation.navigate("Post", {
                params: { word, item, words,words2 },
            });
        }}
    >
        <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemIndex}>{index+1}  </Text>
            <Text style={styles.itemText}>{item.word}</Text>
        </View>
    </TouchableOpacity> 
        
    
    );
};



const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        flexWrap: "wrap",
        marginBottom:5,
        
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
        maxWidth: "100%",
        letterSpacing: 0.6,
    },
    itemIndex:{
        fontWeight:"bold",
        color:"grey",
        opacity:0.6
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
