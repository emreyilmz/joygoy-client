import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
    
} from "react-native";
import Constants from "expo-constants";
import WordsItem from "./WordsItem";
import { FlatList } from "react-native-gesture-handler";
const axios = require("axios");
import { useSelector, useDispatch } from "react-redux";

const WordPass = (props) => {

    const [words, setWords] = useState([]);
    const [words2, setWords2] = useState([]);
    const [count, setCount] = useState(1);

    const language = useSelector((state) => state.AuthReducers.authLanguage);

    /* console.log("1111", words); */
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    //console.log(props.route.params.props.id);
    //console.log("hello", words);
    const id=props.id;

   

    const getMoreData2 = () => {
        //192.168.1.189:5000
        console.log(id)
        axios
            .get("http://3.73.129.160:8080/word2", { params: { id,language } })
            .then(function (result) {
               /*  console.log(result.data.count) */
                const co = Math.ceil(result.data.count/100);
                /* console.log(co) */
                setCount(co)
                console.log("deneme",result.data)
                setWords(result.data.word);
                setWords2(result.data.word);

                console.log("deneme",words)
                /* console.log(words2) */
            })
            .catch((err) => {
                console.log("hello")
                console.log(err);
            });

    }

    const renderLoader = () => {
        return loading ? (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size="large" color="#aaa" />
                <Text style={{ color: "#fff" }}>Loading</Text>
            </View>
        ) : null;
    };

    

    useEffect(() => {
        getMoreData2()
    },[])

    return (
         <View style={[styles.container,{flex:1}]}>
        <FlatList
                        contentContainerStyle={{flexGrow:1}}
                            style={{}}
                            data={words}
                            renderItem={({item,index})=> (
                                
                                <WordsItem
                                index={index}
                                key={item._id}
                                item={item}
                                words={words}
                                words2={words2}
                                onEndReachedThreshold={0.7}
                    onEndReached={() => loadMoreItem} 
                                
                            />
                                

                            )}
                             /* onEndReachedThreshold={0.2}
                            onEndReached={({ distanceFromEnd }) => {
                                if(distanceFromEnd >= 0) {
                                    loadMoreItem()
                                }
                            }}
                            ListFooterComponent={renderLoader} */
                        />
    
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        //marginTop: Constants.statusBarHeight,
        /* marginTop:30 */
    },
    tasksWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
        padding:10,
    },
    items: {
        marginTop: 30,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
    },
});


export default WordPass;