import { Video } from "expo-av";
import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState,
    
} from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    ActivityIndicator
} from "react-native";
import { AntDesign, Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const staticImage = require("../../../assets/unnamed.jpg");
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import Purchases from "react-native-purchases";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-5283178968139478/3557845324';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
import Search from "./Search";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Image,
} from "react-native";

export const PostSingle = forwardRef(
    (
        {
            item,
            showText,
            showOrHide,
            showTranslate,
            showOrHideTranslate,
            playOrStop,
            sound,
            route,
            flat,
            Index,
            premium
        },
        parentRef
    ) => {
        const ref = useRef(null);

        const navigation = useNavigation();
        const [isPreloading,setIsPreloading]=useState(true)
        const authLanguage = useSelector((state) => state.AuthReducers.authLanguage);
        
    
        useImperativeHandle(parentRef, () => ({
            play,
            unload,
            stop,
        }));

        const [loaded, setLoaded] = useState(false);

   

    const getAds = () => {
        console.log("deneme",premium)
        if(!premium){
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            interstitial.show();
    
          });
      
          // Start loading the interstitial straight away
          interstitial.load();
      
          // Unsubscribe from events on unmount
          return unsubscribe;
        }
    }

    useEffect(() => {
        console.log("dil",authLanguage)
       if (Index%9 === 0 && Index>1) {
        console.log("bura",premium)
        if(premium){
            console.log("GİRDİ")
        }else {
            console.log("GİRDİ 2")

            getAds()
        }
      }else {
        console.log(Index)
      }
      /*  */
    }, [Index]); 

    

        

        useEffect(() => {
            return () => unload();
        }, []);

        const play = async () => {
            if (ref.current == null) {
                return;
            }

            // if video is already playing return
            const status = await ref.current.getStatusAsync();
            if (status?.isPlaying) {
                return;
            }
            try {
                await ref.current.replayAsync();
            } catch (e) {
                console.log(e);
            }
        };

        const stop = async () => {
            if (ref.current == null) {
                return;
            }

            // if video is already stopped return
            const status = await ref.current.getStatusAsync();
            if (!status?.isPlaying) {
                return;
            }
            try {
                await ref.current.stopAsync();
            } catch (e) {
                console.log(e);
            }
        };

        const unload = async () => {
            console.log("unload");
            if (ref.current == null) {
                return;
            }

            // if video is already stopped return
            try {
                await ref.current.unloadAsync();
            } catch (e) {
                console.log(e);
            }
        };

        const toggle = async () => {
            if (ref.current == null) {
                return;
            }
            const status = await ref.current.getStatusAsync();

            if (status?.isPlaying) {
                stop();
            } else {
                play();
            }
        };

        
        

        React.useEffect(() => {
            const unsubscribe = navigation.addListener("focus", () => {
                console.log("Focus");
            });

            return unsubscribe;
        }, [navigation]);

        //Blur Event: to be fired when the HomeScreen loses focus.
        React.useEffect(() => {
            const unsubscribe = navigation.addListener("blur", () => {
                console.log("Blur");
                //Every time the screen loses focus the Video is paused
                if (ref) {
                    stop();
                }
            });

            return unsubscribe;
        }, [navigation]);

        return (
            <TouchableWithoutFeedback onPress={() => toggle()}>
                <View style={styles.container}>
                    <View style={styles.container}>
                    {isPreloading &&
            <ActivityIndicator
                animating
                color={"gray"}
                size="large"
                style={{ flex: 1, position:"absolute", top:"50%", left:"45%" }}
            />
        }
                        <Video
                            ref={ref}
                            style={styles.container}
                            source={{
                                uri:
                                "https://aws-joygoy-s3.s3.eu-central-1.amazonaws.com/" +
                                item?.number +
                                ".mp4",
                            }}
                            resizeMode="cover"
                            isMuted={sound}
                            isLooping
                            onLoadStart={() => setIsPreloading(true)}
                            onReadyForDisplay={() => setIsPreloading(false)}
                            
                        />
                    </View>

                    <View style={styles.container2}>
                        <View style={styles.header}>
                           {/*  <TouchableWithoutFeedback
                                onPress={() => playOrStop()}
                                style={{
                                    color: "red",
                                    padding: 5,
                                }}
                            >
                                <FontAwesome
                                    style={{
                                        padding: 5,
                                    }}
                                    name={flat ? "play" : "pause"}
                                    size={22}
                                    color="#fff"
                                />
                            </TouchableWithoutFeedback> */}
                            <View
                                style={{
                                    flexDirection: "column",
                                }}
                            >
                                {/* <TouchableWithoutFeedback
                                    onPress={() => {
                                        navigation.navigate("Search");
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
                                        size={22}
                                        color="white"
                                    />
                                </TouchableWithoutFeedback> */}
                            </View>
                        </View>

                        <View style={styles.subtitle}>
                            {showText ? (
                                <Text
                                    style={[
                                        styles.text2,
                                        ,
                                        { marginBottom: 10 },
                                    ]}
                                >
                                    {item.text}
                                </Text>
                            ) : null}

                            {showTranslate ? (
                                <Text style={[styles.text3]}>{item.tr}</Text>
                            ) : null}
                        </View>

                        <View style={styles.bottom}>
                            <View style={styles.bottomSection}></View>
                            <View style={styles.eyes}>
                                <TouchableWithoutFeedback
                                    onPress={() => showOrHideTranslate()}
                                    style={{
                                        color: "red",
                                        padding: 5,
                                    }}
                                >
                                    <MaterialIcons 
                                    style={{
                                        marginLeft: 15,
                                        padding: 5,
                                    }}
                                    name={
                                            showTranslate
                                                ? "closed-caption"
                                                : "closed-caption-disabled"
                                        } size={28} color="#1DB954" />
                                   
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => showOrHide()}
                                    style={{
                                        color: "red",
                                        padding: 5,
                                    }}
                                >
                                    <MaterialIcons
                                        style={{
                                            marginLeft: 15,
                                            padding: 5,
                                        }}
                                        name={
                                            showText
                                                ? "closed-caption"
                                                : "closed-caption-disabled"
                                        }
                                        size={28}
                                        color="white"
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
);

export default PostSingle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "space-between",
    },
    eyes: {
        //flex: 1,
        flexDirection: "row",
    },
    container2: {
        //marginTop: Constants.statusBarHeight,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        bottom: 0,
        //padding: 20,
        paddingTop: 5,
        //paddingLeft: 15,

        flexDirection: "column",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingTop: 110,
    },
    deneme: {
        //paddingTop: 35,
        /* paddingTop: 20,
        marginLeft: 15, */
    },
    text: {
        color: "red",
        fontSize: 24,
        fontWeight: "bold",
    },
    text2: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",

        zIndex: 999,
    },
    text3: {
        color: "#1DB954",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",

        zIndex: 999,
    },
    subtitle: {
        //backgroundColor:"black",
        //marginTop: 250,
        //backgroundColor:'rgba(0, 0, 0, 0.5)',
        /* marginHorizontal: 15, */
        marginTop: 300,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
        marginHorizontal: 15,
    },
    bottomSection: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    bottomText: {
        justifyContent: "center",
        alignItems: "flex-start",
    },
    displayName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 19,
        marginTop: -1,
    },
    description: {
        marginTop: -2,
        color: "#1DB954",
        fontSize: 15,
        fontWeight: "bold",
        width: 200,
    },
    avatar: {
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    plusIcon: {
        height: 35,
        width: 35,
        borderRadius: 10,
    },
});
