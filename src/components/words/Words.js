import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    DeviceEventEmitter,
    Image
    
} from "react-native";
import Constants from "expo-constants";
import WordPassSingle from "./WordPassSingle";
import { FlatList } from "react-native-gesture-handler";
const axios = require("axios");
import { useNavigation } from "@react-navigation/native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector, useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';


const WordList = (props) => {
    const id = props.route.params.props.id;
    const [words, setWords] = useState([]);
    const [words2, setWords2] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState("");
    const navigation = useNavigation();
    const {t,i18n} = useTranslation()


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
               
                console.log(page)
                setWords([...words,...result.data.word]);
                console.log(words)

            })
            .catch((err) => {
                console.log(err);
            });

        
    }

    const DATA = [
        {
          id: '1',
          title: 'First Item',
        },
        {
          id: '2',
          title: 'Second Item',
        },
        {
          id: '3',
          title: 'Third Item',
        },
        {
          id: '4',
          title: 'Fourth Item',
        },
        {
          id: '5',
          title: 'Fifth Item',
        },
      ];
      
      const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
        return `#${randomColor}`;
      };

    const getMoreData2 = () => {
        //192.168.1.189:5000
        console.log(id)
        axios
            .get("http://3.73.129.160:8080/word2", { params: { id,language } })
            .then(function (result) {
                console.log(result.data.count)
                const co = Math.ceil(result.data.count/100);
                console.log(co)
                setCount(co)
               
              
                
                
                setWords2(result.data.word);
                console.log(words2)
                
                    setLoading(true)
                
                
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

    const loadMoreItem = () => {
        console.log("hello")
        setPage(page + 1);
      };

    useEffect(() => {
        closeActivityIndicator();
        getMoreData2()
        
        console.log(page)
    }, [page]);

    useEffect(() => {
        getMoreData2()
    },[])

    const runFunction = (id) => {
        navigation.navigate("WordPass", {
            params: {id},
        });
    }
{/* <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => {
                console.log("hello")
                navigation.navigate("WordPass", {
                    params: {id,i },
                });
            }}
        >
            <View  style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemIndex}>{i+1}00  </Text>
                <Text style={styles.itemText}>{"Kelime"}</Text>
            </View>
        </TouchableOpacity> */}
    return (

                        <ScrollView style={[styles.container,{flex:1,padding:10}]} >
                            <View style={styles.box}>
                            <Text style={styles.sectionTitle}>{t("Words")}</Text>
                          
       {
        loading?
        count>3?
        new Array(count).fill().map((_, i) => 
        count==""?<View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
        <Text style={{ color: "#fff" }}>Loading</Text>
    </View>:(
            
          <TouchableOpacity 
          style={styles.button }  
          onPress={() => {
            console.log("hello")
            navigation.navigate("WordPass", {
                params: {id,i },
            });
        }}
          >
<View style={{height:45,width:45,backgroundColor:generateColor(),borderRadius:25,opacity:0.3}}>

</View>
      <View>
      <Text style={styles.textCountry}>{i+1}00 {"Kelime"}</Text>
      </View>
      <View style={{
}}></View>
</TouchableOpacity>
        )
        ):<WordPassSingle id={id}/>
        :<View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <ActivityIndicator
            animating={animating}
            color="black"
            size="large"
            style={styles.activityIndicator}
        />
        <Text>Loading</Text>
    </View>}
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
                        </ScrollView>
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
    marginBottom:5
        
    },
    textCountry:{
        fontSize:21,
        fontWeight:"bold",
        marginLeft:10,
        /* marginBottom:5, */
        opacity:0.8,
        
    },
    free:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:5,
        marginBottom:-5,
        marginLeft:10,
    },
    freeText:{
        fontWeight:"bold",
        fontSize:16,
        color:"white",
        backgroundColor:"#E0144C",
        
        borderRadius:15,
        padding:5,
        paddingHorizontal:15,
    },
    textCount:{
        fontSize:12,
        marginLeft:10,
        /* marginBottom:5, */
        color:"#808080"
        
    },
    textCountry2:{
        fontSize:20,
        fontWeight:"bold",
        marginLeft:10,
        /* marginBottom:5, */
        opacity:0.8,
        color:"black",
        marginBottom:22
        
    },
    
    button:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
        
    },
    buttonN:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        marginBottom:-5
        
    },
    buttonPre:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
        
    },
});

export default WordList;
