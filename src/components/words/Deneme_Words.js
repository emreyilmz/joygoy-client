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

const WordList = (props,navigation) => {
    const id = props.route.params.props.id;
    const [words, setWords] = useState([]);
    const [words2, setWords2] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);


    /* console.log("1111", words); */
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    //console.log(props.route.params.props.id);
    //console.log("hello", words);

    const getMoreData = () => {
        axios
            .get("http://3.73.129.160:8080/word", { params: { id,page } })
            .then(function (result) {
                //console.log(result.data.word);
                setLoading(true);
                console.log(page)
                //console.log(result.data.posts[0].video_url)
                setWords([...words,...result.data.word]);
            })
            .catch((err) => {
                console.log(err);
            });

        /* fetch("http://127.0.0.1:5000/allpost").then(res => res.json())
            .then(result => {
                console.log(result.posts)
                setPosts(result.posts)
            })
            .catch(err => {
                console.log(err)
            }) */
    }

    const getMoreData2 = () => {
        //192.168.1.189:5000
        console.log(id)
        axios
            .get("http://192.168.1.189:5000/word2", { params: { id } })
            .then(function (result) {
                console.log(result.data.count)
                const co = Math.ceil(result.data.count/100);
                console.log(co)
                setCount(co)
                setWords2(result.data.word);
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
                <Text style={{ color: "#fff" }}>Yükleniyor</Text>
            </View>
        ) : null;
    };

    const loadMoreItem = () => {
        console.log("hello")
        setPage(page + 1);
      };

    useEffect(() => {
        closeActivityIndicator();
        getMoreData()
        
        console.log(page)
    }, [page]);

    useEffect(() => {
        getMoreData2()
    },[])

    return (

                        <View style={[styles.container,{flex:1,padding:10}]}>
        {new Array(count).fill().map((_, i) => 
            <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => {
                console.log("hello")
                navigation.navigate("WordPass", {
                    params: {words,words2,props },
                });
            }}
        >
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemIndex}>{i+1}00  </Text>
                <Text style={styles.itemText}>{"Kelime"}</Text>
            </View>
        </TouchableOpacity>
        )}
                        {/* <FlatList
                        contentContainerStyle={{flexGrow:1}}
                            style={{marginBottom:20}}
                            data={words2}
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
                            onEndReachedThreshold={0.2}
                            onEndReached={({ distanceFromEnd }) => {
                                if(distanceFromEnd >= 0) {
                                    loadMoreItem()
                                }
                            }}
                            ListFooterComponent={renderLoader}
                        /> */}
                        </View>
    );
};

{/* <WordsItem
                                key={item._id}
                                item={item}
                                words={words}
                                words2={words2}
                                onEndReachedThreshold={0.5}
                    onEndReached={() => loadMoreItem}
                                
                            /> */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        //marginTop: Constants.statusBarHeight,
        marginBottom:100
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
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
    },
    //hello
    item: {
        backgroundColor: "#FFF",
        padding: 18,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
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

export default WordList;
