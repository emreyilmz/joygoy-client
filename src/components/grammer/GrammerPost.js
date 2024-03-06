import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    View,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Text
} from "react-native";
import styles from "./styles";
import GrammerSingle from "./GrammerSingle";
const axios = require("axios");
import { FlatList as Flatlist2 } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next'
import Purchases from "react-native-purchases";
import { TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId_Banner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';

export default function App({ route,navigation }) {
    const [posts, setPosts] = useState([]);
    const [showText, setShowText] = useState(true);
    const [showTranslate, setShowTranslate] = useState(true);
    const [sound, setSound] = useState(false);
    const [flat, setFlat] = useState(true);
    const {t,i18n} = useTranslation()
    const [premium,setPremium] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

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
  
    


    const language = useSelector((state) => state.AuthReducers.authLanguage);


    const data2 = [
        {
            _İd:"6051f9bba4e2070001537f5a0",
            text: t('VideoNotFound'),
            tr: t('VideoNotFound_Desc'),
            number: "ur6I5m2nTvk",
        },
        
    ];

    const mediaRefs = useRef([]);

    const regex = route.params.params.regex;
    const name = route.params.params.name;
    const id = route.params.params.id;
    const status = route.params.params.status;



    const soundOrMute = () => {
        setSound(!sound);
    };

    useEffect(  () => {
        setPosts([])
        getMoreData()
     },[language])

    const getMoreData= () => {
        console.log(name,id)
        axios
            .post("http://3.73.129.160:8080/search-grammer", { regex, name,language,id,status })
            .then(function (result) {
                //setPosts([...posts, ...result.data.posts]);
                setLoading(true);

                setPosts(result.data.posts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {

        getMoreData()
        /* } */
    }, []);

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
                <GrammerSingle
                    item={item}
                    showOrHide={showOrHide}
                    showText={showText}
                    premium={premium}
                    showTranslate={showTranslate}
                    showOrHideTranslate={showOrHideTranslate}
                    onViewableItemsChanged={onViewableItemsChanged}
                    playOrStop={playOrStop}
                    flat={flat}
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
            {/* <Text>hello</Text> */}
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
                    backgroundColor:"black"
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
