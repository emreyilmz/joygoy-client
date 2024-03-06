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
import {useTranslation} from 'react-i18next'

const WordPass = ({route}) => {
    const id = route.params.params.id;
    const page = route.params.params.i;
    console.log("sayfa",page,"sayfa")
    const {t,i18n} = useTranslation()

    const [words, setWords] = useState([]);
    const [words2, setWords2] = useState([]);
    /* const [page, setPage] = useState(1); */
    const [count, setCount] = useState(1);

    const language = useSelector((state) => state.AuthReducers.authLanguage);

    /* console.log("1111", words); */
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    //console.log(props.route.params.props.id);
    //console.log("hello", words);

    const getMoreData = () => {
        axios
            .get("http://3.73.129.160:8080/word", { params: { id,page,language } })
            .then(function (result) {
                //console.log(result.data.word);
                setLoading(true);
                /* console.log(page) */
                //console.log(result.data.posts[0].video_url)
                //setWords([...words,...result.data.word]);
                setWords(result.data.word);
                console.log(words)
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
            .get("http://3.73.129.160:8080/word2", { params: { id,language } })
            .then(function (result) {
               /*  console.log(result.data.count) */
                const co = Math.ceil(result.data.count/100);
                /* console.log(co) */
                setCount(co)
                setWords2(result.data.word);
                console.log(words2)
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
         <View style={[styles.container,{flex:1}]}>
            <View style={styles.box}>
                            <Text style={styles.sectionTitle}>{t("Words")}</Text>
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
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
        /* marginTop:400 */
        padding:10,
        backgroundColor: "#E8EAED",
        alignContent:"center",
        
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
        padding:10,
    },

    box:{
        display:"flex",
        backgroundColor:"white",
        padding:10,
        borderRadius:28,
    marginBottom:30
        
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