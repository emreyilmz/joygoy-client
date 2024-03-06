import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Button
} from "react-native";
import Constants from "expo-constants";
import WordList from "./WordList";
import WordListPre from "./WordListPre";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector, useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next'
import Purchases from "react-native-purchases";

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';
import AsyncStorage from "@react-native-async-storage/async-storage";

  
const axios = require("axios");





function Home({ navigation }) {
    const [lists, setLists] = useState([]);
    const [show, setShow] = useState(false);
    const authLanguage = useSelector((state) => state.AuthReducers.authLanguage);
    const {t,i18n} = useTranslation()
    const [premium,setPremium] = useState(false);

  

    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);


    const getMoreData = () => {
        axios
        .get("http://3.73.129.160:8080/list",{ params: { authLanguage }})
        .then(function (result) {
            //console.log(result.data.lists);
            setLoading(true);
            
           

            //console.log(result.data.posts[0].video_url)
            setLists(result.data.lists);
        })
        .catch((err) => {
            console.log(err);
        });

    }

    useEffect(() => {
        i18n.changeLanguage(authLanguage)
        console.log("bura",authLanguage)
        /*  AsyncStorage.removeItem("language"); */

       getMoreData()
        /* fetch("http://127.0.0.1:5000/allpost").then(res => res.json())
        .then(result => {
            console.log(result.posts)
            setPosts(result.posts)
        })
        .catch(err => {

            console.log(err)
        }) */
    }, []);

    const getPremium = async () => {
        console.log("GETPremium")
        try {
            const customerInfo = await Purchases.getCustomerInfo();

            console.log(customerInfo.entitlements)





            if(customerInfo.entitlements.active.Pro.isActive) {
                setPremium(true)
              }
              else  {
                setPremium(false)

              }
              
          } catch (e) {

            setPremium(false)



          }
          
          
    }

    useEffect(() => {
       getPremium()
    },[])

    useEffect(() => {
        setLists([])
        getMoreData()
    },[authLanguage])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
         {premium?
        null:<View style={{backgroundColor:"white",height:60}}>
        <BannerAd
    unitId={adUnitId}
    size={BannerAdSize.FULL_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
          </View>}
        <ScrollView style={styles.container}>
            
           <Text style={styles.textCountry2}>{t("WordList")}</Text>
            
            

            <View style={styles.tasksWrapper}>
                

                {loading ? (
                    <View style={styles.box}>
                        {/*  <WordList key={2} text={"hello"} color={"#1DB954"} id={5} /> */}
                        {lists.map((list, stepIndex) => (
                            stepIndex < 3?<WordList
                            key={list._id}
                            tr={list[authLanguage]}
                            image={list.image}
                            count={list.count}
                            id={list._id}
                            stepIndex={stepIndex}
                        />:<WordListPre
                        key={list._id}
                        tr={list[authLanguage]}
                        image={list.image}
                        count={list.count}
                        id={list._id}
                        stepIndex={stepIndex}
                        premium={premium}
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
                        <Text>Yükleniyor</Text>
                    </View>
                )}
            </View>
            
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    box:{
        display:"flex",
        backgroundColor:"white",
        padding:10,
        borderRadius:28,
    marginBottom:5
        
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
    container: {
        flex: 1,
        paddingTop:20,
        /* marginTop:400 */
        padding:10,
        backgroundColor: "#E8EAED",
        alignContent:"center",
    },
    tasksWrapper: {
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
        paddingHorizontal:20
    },
    items: {
        marginTop: 0,
        paddingHorizontal:0,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
    },
});

export default Home;
