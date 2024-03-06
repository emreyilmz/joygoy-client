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
} from "react-native";
import styles from "./styles";
import PostSingle from "./SearchSingle";
import { useSelector, useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next'
import Purchases from "react-native-purchases";
import { TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId_Banner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';

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
export default function App({ route,navigation }) {
    const [posts, setPosts] = useState([]);
    const [aaaaa, setAaaaa] = useState([]);
    const {t,i18n} = useTranslation()

    const [showText, setShowText] = useState(true);
    const [showTranslate, setShowTranslate] = useState(true);
    const [playOrStopS, setPlayOrStopS] = useState(true);
    const [sound, setSound] = useState(false);
    const [flat, setFlat] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const text = route.params?.params.text;

    const [premium,setPremium] = useState(false);

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
        setPosts()
        getMoreData()
     },[premium])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);
  

    const abc = Dimensions.get("window").height - 200;
    const language = useSelector((state) => state.AuthReducers.authLanguage);
    

    const mediaRefs = useRef([]);

    const soundOrMute = () => {
        setSound(!sound);
    };


    const data2 = [
        {
            _İd:"6051f9bba4e2070001537f5a0",
            text: t('VideoNotFound'),
            tr: t('VideoNotFound_Desc'),
            number: "ur6I5m2nTvk",
        },
        
    ];

    const getMoreData = () => {
        console.log(text);
        axios
            .post("http://3.73.129.160:8080/discover-shorts", {
                text,
                language


            })
            .then(function (result) {

                //setPosts([...posts, ...result.data.posts]);
                setLoading(true);
                /* console.log(result.data.posts) */

                setAaaaa(result.data.posts);
                console.log(aaaaa)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(  () => {
        setAaaaa([])
        getMoreData()
     },[language])


    useEffect(() => {
        getMoreData()
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
                <Text style={{ color: "#fff" }}>Yükleniyor</Text>
            </View>
        ) : null;
    };

    const renderItem = ({ item, index }) => {
        const size=premium?80:140;
        return (
                <View
                    style={[
                        {
                            flex: 1,
                            height: Dimensions.get("window").height - size,
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
                        showText={showText}
                        showTranslate={showTranslate}
                        showOrHideTranslate={showOrHideTranslate}
                        onViewableItemsChanged={onViewableItemsChanged}
                        playOrStopS={playOrStopS}
                        playOrStop={playOrStop}
                        flat={flat}
                        premium={premium}
                        Index={index}
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

            {flat ? (
                <FlatList
                    style={{ backgroundColor: "black", zIndex: 999 }}
                    data={aaaaa==""?data2:aaaaa}
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
                    data={aaaaa==""?data2:aaaaa}
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
