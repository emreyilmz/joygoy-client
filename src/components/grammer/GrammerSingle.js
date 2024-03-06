import { Video } from "expo-av";
import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState
} from "react";
import { AntDesign, Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
    ActivityIndicator
} from "react-native";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-5283178968139478/3557845324';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export const PostSingle = forwardRef(
    (
        {
            item,
            showText,
            showOrHide,
            showTranslate,
            showOrHideTranslate,
            sound,
            playOrStop,
            flat,
            Index,
            premium
        },
        parentRef
    ) => {
        const ref = useRef(null);

        const navigation = useNavigation();
        const language = useSelector((state) => state.AuthReducers.authLanguage);
        const [isPreloading,setIsPreloading]=useState(true)


        useImperativeHandle(parentRef, () => ({
            play,
            unload,
            stop,
        }));

        const [loaded, setLoaded] = useState(false);
    
        const getAds = () => {
            console.log("function")
            const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setLoaded(true);
                interstitial.show();
        
              });
          
              // Start loading the interstitial straight away
              interstitial.load();
          
              // Unsubscribe from events on unmount
              return unsubscribe;
        }
    
        useEffect(() => {
           /*  console.log(Index) */
           if (Index%9 === 0 && Index>1) {
            if(premium){
    
            }else {
                
                getAds();
            }
          }else {
            console.log(Index)
          }
          /*  */
        }, []); 
    

        useEffect(() => {
            return () => unload();
        }, []);

        const play = async () => {
            if (ref.current == null) {
                return;
            }

            const status = await ref.current.getStatusAsync();
            if (status?.isPlaying) {
                return;
            }
            try {
                await ref.current.playAsync();
            } catch (e) {
                console.log(e);
            }
        };

        const stop = async () => {
            if (ref.current == null) {
                return;
            }

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
            if (ref.current == null) {
                return;
            }

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
            const unsubscribe = navigation.addListener("focus", () => {});

            return unsubscribe;
        }, [navigation]);

        React.useEffect(() => {
            const unsubscribe = navigation.addListener("blur", () => {
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
                            //useNativeControls
                            isLooping
                            isMuted={sound}
                            onLoadStart={() => setIsPreloading(true)}
                            onReadyForDisplay={() => setIsPreloading(false)}
                        />
                    </View>

                    <View style={styles.container2}>
                        <View style={[styles.header,{paddingTop:premium?100:150}]}>
                            <TouchableOpacity
                                style={styles.deneme}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="arrowleft"
                                    size={28}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableWithoutFeedback
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
                                </TouchableWithoutFeedback>
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
                                <Text style={[styles.text3]}>{item[language]}</Text>
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
        flexDirection: "row",
    },
    container2: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        bottom: 0,
        paddingTop: 5,

        flexDirection: "column",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
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
