import { View, Text, StyleSheet,Image,TouchableOpacity,Share, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const staticImage = require("../../../assets/turkey.png");
const staticProfile = require("../../../assets/user.png");
const staticPremium = require("../../../assets/premium-quality.png");

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather,FontAwesome5,AntDesign  } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as StoreReview from 'expo-store-review';
import * as Linking from 'expo-linking';
import { GetLanguage } from "../../store/actions";
import {useTranslation} from 'react-i18next'
import moment from 'moment';




const Discover = ({navigation}) => {
    const language = useSelector((state) => state.AuthReducers.authLanguage);
    const [langu,setLanguage] = useState({})
    const {t,i18n} = useTranslation()


    const onShare =  () => {
         /* const uri = await getGalleryImageAsync(1);
     */
        Share.share(
          {
            title: 'https://play.google.com/store/apps/details?id=com.Joygoy.Joygoy',
             url: "www.joygoy.com", 
          },
          {
            excludedActivityTypes: [
              // 'com.apple.UIKit.activity.PostToWeibo',
              // 'com.apple.UIKit.activity.Print',
              // 'com.apple.UIKit.activity.CopyToPasteboard',
              // 'com.apple.UIKit.activity.AssignToContact',
              // 'com.apple.UIKit.activity.SaveToCameraRoll',
              // 'com.apple.UIKit.activity.AddToReadingList',
              // 'com.apple.UIKit.activity.PostToFlickr',
              // 'com.apple.UIKit.activity.PostToVimeo',
              // 'com.apple.UIKit.activity.PostToTencentWeibo',
              // 'com.apple.UIKit.activity.AirDrop',
              // 'com.apple.UIKit.activity.OpenInIBooks',
              // 'com.apple.UIKit.activity.MarkupAsPDF',
              // 'com.apple.reminders.RemindersEditorExtension',
              // 'com.apple.mobilenotes.SharingExtension',
              // 'com.apple.mobileslideshow.StreamShareService',
              // 'com.linkedin.LinkedIn.ShareExtension',
              // 'pinterest.ShareExtension',
              // 'com.google.GooglePlus.ShareExtension',
              // 'com.tumblr.tumblr.Share-With-Tumblr',
              // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
            ],
          }
        ); 
      };
    
    
    
    const [user, setUser] = useState([]);

    const token = useSelector((state) => state.AuthReducers.authToken);

    let handleReview = () => {
        const androidPackageName = 'com.Joygoy.Joygoy';
    // Open the Android Play Store in the browser -> redirects to Play Store on Android
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
    );
    // Open the Android Play Store directly
    Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);

        if (StoreReview.isSupported()) {
          StoreReview.requestReview();
        }
      };
    

    const getMoreData = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
            .get("http://3.73.129.160:8080/myuser", config)
            .then(function (result) {
                console.log("hello")
                console.log(result.data.user[0]._id);
                setUser(result.data.user[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getLanguage = () => {
        console.log("buraaa<",language)
        axios
            .get("http://3.73.129.160:8080/country",{
                params: { language },

              })
            .then(function (result) {
                console.log(result.data.lang)
                setLanguage(result.data.lang)
                /* console.log(result.data.user[0]._id);
                setUser(result.data.user[0]); */
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {

        
        getMoreData();
        getLanguage();
    }, []);

    useEffect(() => {
        getLanguage();
    }, [language]);

    useEffect(() => {
        getMoreData();
        getLanguage();
    }, [token]);

    return (
        <ScrollView style={styles.container}>
           <View style={styles.container2}>
           <View style={styles.topBox}>
            {token?(
                <View style={styles.profile}>
                <Image
                                        style={styles.avatarProfile}
                                        source={staticProfile}
                                    />
                    <View style={styles.textPro}>
                    <Text style={styles.textProfile}>{user.email}</Text>
                    <Text style={styles.textProfileBottom}>{moment.utc(user.createdAt).local().startOf('seconds').fromNow()

} </Text>
                    </View>
                    
                </View>

    

            ):(
                <View style={styles.profile}>
                <Image
                                        style={styles.avatarProfile}
                                        source={staticProfile}
                                    />
                    <View style={styles.textPro}>
                    <Text style={styles.textProfile}>{t('Guest')}</Text>
                    <Text style={styles.textProfileBottom}></Text>
                    </View>
                    
                </View>
            )}
            
            <LinearGradient
                            colors={["#1DB954", "#01ab9d"]}
                            style={styles.count}
                        >
            {/* <View style={styles.count}> */}
            <Text style={styles.textCount}>3.104.259</Text>
            <Text style={styles.descriptionCount}>{t('Video')}</Text>

           {/*  </View> */}
            </LinearGradient>
            <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Premium")
                                }
                                style={[
                                    styles.signIn,
                                    {
                                        borderColor: "#1DB954",
                                        borderWidth: 1,
                                        marginTop: 15,
                                        flexDirection:"row"
                                    },
                                ]}
                            >
                                <View>
                                <Image
                                    style={styles.avatarPremium}
                                    source={staticPremium}
                                />
                                </View>
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: "black",
                                            marginLeft:10
                                        },
                                    ]}
                                >
                                  {t('MeReview')}
                                </Text>
                            </TouchableOpacity>
                        </View>
            </View>
            <TouchableOpacity style={styles.language}
            onPress={() => navigation.navigate("Language")}
            >
                <Text style={styles.text}>Your Language {langu.language}</Text>

                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri:
                                            "https://aws-joygoy-s3.s3.eu-central-1.amazonaws.com/flag/" +
                                            langu?.image +
                                            ".png",
                                    }}
                                />
            </TouchableOpacity>
            <View style={[styles.profile,{
        padding:20,width:"90%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}]}>
             <TouchableOpacity
             onPress={() => navigation.navigate("Premium")} //submit
            >
            <View style={styles.settingsGroup}>
            <FontAwesome5 name="chess-king" size={24} color="orange" />
            <Text style={[styles.textSettings,{color:"orange"}]}>{t('AdsRemove')}</Text>
            </View>
            
            </TouchableOpacity>
            {token?(
                <TouchableOpacity
                onPress={() => token?navigation.navigate("Settings",{params:{user}}):navigation.navigate('SignInScreen')} //submit
               >
               <View style={styles.settingsGroup}>
               <Feather
                                       name="settings"
                                       size={24}
                                       color="green"
                                   />
               <Text style={styles.textSettings}>{t('Settings')}</Text>
               </View>
               </TouchableOpacity>
            ):(null)}
            {/* <TouchableOpacity
             onPress={() => navigation.navigate("CountVideo")} //submit
            >
            <View style={styles.settingsGroup}>
            <Feather
                                    name="command"
                                    size={24}
                                    color="green"
                                />
            <Text style={styles.textSettings}>{t('Information')}</Text>
            </View>
            </TouchableOpacity> */}
            
            <TouchableOpacity
              onPress={() => navigation.navigate("Review")}
            >
            <View style={styles.settingsGroup}>
            <AntDesign name="star" size={24} color="green" />
            <Text style={styles.textSettings}>{t('Review_Header')}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onShare}
            >
            <View style={styles.settingsGroup}>
            <FontAwesome name="share" size={24} color="green" />
            <Text style={styles.textSettings}>{t('MeInvite')}</Text>
            </View>
            </TouchableOpacity>


            </View>
           </View>
        </ScrollView>
    );
};

export default Discover;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        //marginTop: Constants.statusBarHeight,
        height: 100,
        paddingVertical:20,
        
    },
    container2:{
        alignItems:"center",
    },
    settingsGroup:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:25,
    },
    topBox:{
        backgroundColor:"#fff",
        height:250,
        width:"90%",
        padding:20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    profile:{
        marginTop:50
    },
    count:{
        marginTop:20,
        backgroundColor:"blue",
        width:"100%",
        height:65,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontWeight:"bold",
        fontSize:19,
        letterSpacing:2,
        width:"80%"
    },
    textSettings:{
        fontWeight:"bold",
        fontSize:22,
        letterSpacing:1,
        marginLeft:10
    },
    textProfile:{
        fontWeight:"bold",
        fontSize:17,
    },
    textProfileBottom:{
        fontWeight:"medium",
        fontSize:11,
    },
    descriptionCount:{
        fontWeight:"medium",
        fontSize:13,
        opacity:0.6,
        color:"white",
    },
    textCount:{
        fontWeight:"bold",
        fontSize:25,
        
        color:"white",
    },
    textPro:{
        justifyContent:"center",
        alignItems:"flex-start"
    },
    language:{
        marginTop:20,
        paddingLeft:15,
        backgroundColor:"#fff",
        height:65,
        width:"90%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        /* paddingHorizontal: 20, */
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center"
    },
    avatar: {
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    avatarProfile: {
        marginRight: 15,
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    avatarPremium:{
        height: 35,
        width: 35,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    profile:{
        flexDirection:"row",
        alignItems:"center"
    },
    signIn: {
        width: "100%",
        height: 65,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonPrimary2: {
        backgroundColor: "#1DB954",
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
        margin: 0,
    },
});
