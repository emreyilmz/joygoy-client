import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    TextInput,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
/* import styles from "./styles"; */
import PostSingle from "./PostSingle";
import PostSingle2 from "./PostSingle2";
import { FontAwesome } from "@expo/vector-icons";
import {useTranslation} from 'react-i18next'
import Purchases from "react-native-purchases";
import { InterstitialAd, TestIds, AdEventType,BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useSelector, useDispatch } from "react-redux";

const adUnitId_Banner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-5283178968139478/9711103053';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const axios = require("axios");
import Constants from "expo-constants";
import { FlatList as Flatlist2 } from "react-native-gesture-handler";
/* import DeviceInfo from "react-native-device-info"; */

/* import { getNavigationBarHeight } from "react-native-android-navbar-height"; */

/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function App({ route ,navigation}) {
    const [posts, setPosts] = useState([]);
    const [aaaaa, setAaaaa] = useState([]);
    const {t,i18n} = useTranslation()
    const [premium,setPremium] = useState(false);

    const [showText, setShowText] = useState(true);
    const [showTranslate, setShowTranslate] = useState(true);
    const [playOrStopS, setPlayOrStopS] = useState(true);
    const [sound, setSound] = useState(false);
    const [flat, setFlat] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const text = route.params?.params.text;
    const authLanguage = useSelector((state) => state.AuthReducers.authLanguage);

    const abc = Dimensions.get("window").height - 200;

    const mediaRefs = useRef([]);

    const data2 = [
        {
            _İd:"6051f9bba4e2070001537f5a0",
            text: t('VideoNotFound'),
            tr: t('VideoNotFound_Desc'),
            number: "ur6I5m2nTvk",
        },
        
    ];

    const soundOrMute = () => {
        setSound(!sound);
    };

    const getMoreData = () => {
        axios
            .get("http://3.73.129.160:8080/aa", {
                params: { page,authLanguage },
            })
            .then(function (result) {
                setLoading(true);
                
                setAaaaa([...aaaaa, ...result.data.posts]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMoreData2 = () => {
        axios
            .get("http://3.73.129.160:8080/aa", {
                params: { page,authLanguage },
            })
            .then(function (result) {
                setLoading(true);
                setAaaaa(result.data.posts);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(  () => {
        console.log("DEĞİŞTİ BURA")
        setAaaaa([])
        getMoreData2()
     },[authLanguage])

    const [loaded, setLoaded] = useState(false);

    /* useEffect(() => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
        interstitial.show();

      });
  
      // Start loading the interstitial straight away
      interstitial.load();
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, []); */
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
        setAaaaa()
        getMoreData()
     },[premium])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);
  
    
  

    useEffect(() => {
        getMoreData();

        /* } */
    }, []);

    useEffect(() => {
        getMoreData();
    }, [page]);

    useEffect(() => {
        console.log("hahahhah");
        axios
            .post("http://192.168.1.189:5000/search-shorts", {
                params: { text },
            })
            .then(function (result) {
                //setPosts([...posts, ...result.data.posts]);
                setLoading(true);
                setPosts(result.data.posts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [text]);

    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach((element) => {
            const cell = mediaRefs.current[element.key];
            if (cell) {
                if (element.isViewable) {
                    cell.stop();
                } else {
                    cell.stop();
                }
            }
        });
    });

    const handleViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach((element) => {
            const cell = mediaRefs.current[element.key];
            if (cell) {
                if (element.isViewable) {
                    cell.play();
                } else {
                    cell.stop();
                }
            }
        });
    });

    const playOrStop = () => {
        setFlat(!flat);
    };

    const showOrHide = () => {
        setShowText(!showText);
    };

    const showOrHideTranslate = () => {
        setShowTranslate(!showTranslate);
    };

    const renderLoader = () => {
        return loading ? (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size="large" color="#aaa" />
                <Text style={{ color: "#fff" }}>Loading</Text>
            </View>
        ) : null;
    };

    const renderItem = ({ item, index }) => {
        const size=premium?140:200;
        return (
            
                <View
                    style={[
                        {
                            flex: 1,
                            height: Dimensions.get("window").height - size,//140
                            width: Dimensions.get("window").width,
                        },
                        index % 2 == 0
                            ? { backgroundColor: "black" }
                            : { backgroundColor: "black" },
                    ]}
                >
                    <PostSingle
                        item={item}
                        showOrHide={showOrHide}
                        premium={premium}
                        showText={showText}
                        showTranslate={showTranslate}
                        showOrHideTranslate={showOrHideTranslate}
                        onViewableItemsChanged={onViewableItemsChanged}
                        playOrStopS={playOrStopS}
                        playOrStop={playOrStop}
                        Index={index}
                        flat={flat}
                        ref={(PostSingleRef) =>
                            (mediaRefs.current[item._id] = PostSingleRef)
                        }
                        soundOrMute={soundOrMute}
                        sound={sound}
                    />
                </View>
              
        );
    };

    return (
        <>
        {premium?
            null:<View style={{backgroundColor:"white",height:60}}>
            <BannerAd
        unitId={adUnitId_Banner}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
              </View>}
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} hidden={true} />
            <TouchableOpacity style={styles.footer} onPress={() => {
                                        navigation.navigate("Search");
                                    }}>
                <View
                    style={styles.textInput}

                >
                    <Text>{t('SearchWord')}</Text>
                </View>
                <TouchableWithoutFeedback
                    /* onPress={() => {
                        navigation.navigate("SearchScreen", {
                            params: { text },
                        });
                    }} */
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
            </TouchableOpacity>
            {flat ? (
                <FlatList
                    style={{ backgroundColor: "black", zIndex: 999 }}
                    data={aaaaa}
                    windowSize={4}
                    initialNumToRender={0}
                    maxToRenderPerBatch={2}
                    removeClippedSubviews
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                    renderItem={renderItem}
                    pagingEnabled
                    keyExtractor={(item) => item._id}
                    decelerationRate={"fast"}
                    onViewableItemsChanged={handleViewableItemsChanged.current}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setPage(page + 1)}
                    ListFooterComponent={renderLoader}
                />
            ) : (
                <Flatlist2
                    style={{ backgroundColor: "black", zIndex: 999 }}
                    data={aaaaa}
                    windowSize={4}
                    initialNumToRender={0}
                    maxToRenderPerBatch={2}
                    removeClippedSubviews
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                    renderItem={renderItem}
                    pagingEnabled
                    keyExtractor={(item) => item._id}
                    decelerationRate={"fast"}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setPage(page + 1)}
                    ListFooterComponent={renderLoader}
                />
            )}
        </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        width: Dimensions.get("window").width,
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: Dimensions.get("window").width - 60,
        height:"70%",
        margin: 5,
        backgroundColor: "lightgray",
        padding: 5,
        borderRadius: 4,
        justifyContent:"center",
        alignItems:"flex-start",
        opacity:0.4
    },
});