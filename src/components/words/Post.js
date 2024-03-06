import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    Dimensions,
    FlatList,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    SectionList,
    ActivityIndicator
} from "react-native";
import styles from "./styles";
import PostSingle from "./PostSingle";
const axios = require("axios");
import Constants from "expo-constants";
import { FlatList as Flatlist2 } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next'
import Purchases from "react-native-purchases";
import { TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId_Banner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';


/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function App({ route,navigation }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [wordO, setWordO] = useState([]);
    const [xOffset, setxOffset] = useState("");
    const [showText, setShowText] = useState(true);
    const [showTranslate, setShowTranslate] = useState(true);
    const [playOrStopS, setPlayOrStopS] = useState(true);
    const [sound, setSound] = useState(false);
    const [flat, setFlat] = useState(true);
    const {t,i18n} = useTranslation()
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const [premium,setPremium] = useState(false);

    

    const getPremium = async () => {
        console.log("GETPremium")
        try {
            const customerInfo = await Purchases.getCustomerInfo();

            




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
        
        getMoreData()
     },[premium])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);
  

    const language = useSelector((state) => state.AuthReducers.authLanguage);


    const flatListRef = React.useRef();

    const data2 = [
        {
            _İd:"6051f9bba4e2070001537f5a0",
            text: t('VideoNotFound'),
            tr: t('VideoNotFound_Desc'),
            number: "ur6I5m2nTvk",
        },
        
    ];

    const mediaRefs = useRef([]);

    const words = route.params.params.words;
    const words2 = route.params.params.words2;

   /*  console.log(words2,"deneme") */



    const soundOrMute = () => {
        setSound(!sound);
    };

    const doSomething = () => {
        const tr = words2.findIndex((obj) => obj._id === wordO._id);
        const length = words2.length - 1;
        if (tr < length) {
            setWordO(words2[tr + 1]);
            setText(words2[tr + 1].word);
        }
        setPosts([]);
    };
    const dontSomething = () => {
        const tr = words2.findIndex((obj) => obj._id === wordO._id);
        const length = words2.length - 1;
        if (tr > 0) {
            setWordO(words2[tr - 1]);
            setText(words2[tr - 1].word);
        }
        setPosts([]);
    };

    useEffect(  () => {
        console.log("DEĞİŞTİ BURA")
        setPosts([])
        getMoreData()
     },[language])

    


    const getMoreData = () => {
        console.log("bura",text)
        if (text == "") {
            setText(route.params.params.word);
        }
        if (wordO == "") {
            setWordO(route.params.params.item);
        }


        
      
            if(posts==""){
                axios
            .post("http://3.73.129.160:8080/search-shorts", {
                params: { text,language },
                text,
                language
            })
            .then(function (result) {
                console.log("text",text)
                setLoading(true);
                console.log(result.data.posts[0])
                if(text){
                    setPosts(result.data.posts);
                }else {
                    
                }

            })
            .catch((err) => {
                console.log(err);
            });
            }
           
        
    };

    useEffect(() => {
        getMoreData();

    });

    

   /*  useEffect(() => {
        console.log("değişti")
    },[language]); */

   /*  useEffect(() => {
        getMoreData();
    }, [text]); */

    const playOrStop = () => {
        setFlat(!flat);
        console.log(flat);
    };

    const showOrHide = () => {
        setShowText(!showText);
    };

    const showOrHideTranslate = () => {
        setShowTranslate(!showTranslate);
    };

    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach((element) => {
            const cell = mediaRefs.current[element.key];
            if (cell) {
                /* console.log(
                    "onViewableItemsChanged",
                    element,
                    element.isViewable
                ); */
                if (element.isViewable) {
                    console.log("onViewableItemsChange 1");

                    cell.stop();
                } else {
                    cell.stop();
                }
            }
        });
    });

    const handleViewableItemsChanged = useRef(({ changed }) => {
        console.log("onViewableItemsChange 2");
        changed.forEach((element) => {
            const cell = mediaRefs.current[element.key];
            if (cell) {
                /* console.log(
                "onViewableItemsChanged",
                element,
                element.isViewable
            ); */
                if (element.isViewable) {
                    console.log("onViewableItemsChange 2");

                    cell.play();
                } else {
                    cell.stop();
                }
            }
        });
    });

    const onViewableItems = useRef(({ changed }) => {
        //console.log("onViewableItems");
        changed.forEach((element) => {
            mediaRefs.current[element.key].unload;

            const cell = mediaRefs.current[element.key];
            if (cell) {
                /* console.log(
                    "onViewableItemsChanged",
                    element,
                    element.isViewable
                ); */
                if (element.isViewable) {
                    cell.unload();
                } else {
                    cell.unload();
                }
            }
        });
    });

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
                    wordObj={wordO}
                    doSomething={doSomething}
                    dontSomething={dontSomething}
                    showOrHide={showOrHide}
                    flat={flat}
                    Index={index}
                    showText={showText}
                    showTranslate={showTranslate}
                    showOrHideTranslate={showOrHideTranslate}
                    onViewableItemsChanged={onViewableItemsChanged}
                    playOrStop={playOrStop}
                    premium={premium}
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
            
            {loading ?
            flat ? (
                <FlatList
                    style={{ backgroundColor: "black", zIndex: 999 }}
                    data={posts==""?data2:posts}
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
                    /*   
                onEndReachedThreshold={0.5}
                onEndReached={() => setPage(page + 1)} */
                />
            ) : (
                <Flatlist2
                    style={{ backgroundColor: "black", zIndex: 999 }}
                    data={posts==""?data2:posts}
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
                    /*   
        onEndReachedThreshold={0.5}
        onEndReached={() => setPage(page + 1)} */
                />
            )
            :(
                <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    color:"blak"
                }}
            >
                <ActivityIndicator
                    animating={animating}
                    color="white"
                    size="large"
                    style={styles.activityIndicator}
                />
                <Text>Yükleniyor</Text>
            </View>
            )}
        </SafeAreaView>
        </>
    );
}
