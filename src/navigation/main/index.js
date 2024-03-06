import { View, Text, Button } from "react-native";
import React,{useState,useEffect} from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MainScreen from "../home/index";
import Discover from "../../components/discover/Post";
import MyList from "../../components/myList/List";
import Grammer from "../../components/grammer/Grammer";
import GrammerPost from "../../components/grammer/GrammerPost";
import SearchScreen from "../../components/discover/SearchScreen";
import Search from "../../components/discover/Search";

import MyWords from "../../components/myList/MyWords";
import MyPost from "../../components/myList/Post";
import SplashScreen from "../../components/login/SplashScreen";
import SignInScreen from "../../components/login/SignInScreen";
import SignUpScreen from "../../components/login/SignUpScreen";
import Me from "../../components/me/Me";
import Premium from "../../components/me/Premium";
import PremiumGrammer from "../../components/grammer/Premium";

import Settings from "../../components/me/Settings";
import CountVideo from "../../components/me/CountVideo";
import Information from "../../components/me/Information";
import Review from "../../components/me/Review";
import Invite from "../../components/me/Invite";
import Language from "../../components/me/language";
import Purchases from "react-native-purchases";


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch,useSelector } from "react-redux";
import { Logout } from "../../store/actions";


import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
const EmptyScreen = () => {
    
    const dispatch = useDispatch();
    const submit = () => {
        console.log("hello");
        dispatch(Logout());
    };
    return (
        <View>
            <Button
                onPress={() => submit()}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
};

const MeStack = createStackNavigator();
const MeNavigator = () => (
    <MeStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <MeStack.Screen name="My" component={Me} />
        <MeStack.Screen name="Premium" component={Premium} />
        <MeStack.Screen name="Settings" component={Settings} />
        <MeStack.Screen name="CountVideo" component={CountVideo} />
        <MeStack.Screen name="Information" component={Information} />
        <MeStack.Screen name="Review" component={Review} />
        <MeStack.Screen name="Invite" component={Invite} />
        <MeStack.Screen name="Language" component={Language} />
        
        <MeStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                />
                <MeStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                />

        
        
    </MeStack.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                options={{ headerShown: false }}
            >
                {/* <RootStack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                /> */}
                <RootStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                />
                <RootStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                />
            </RootStack.Navigator>
    );
};


const MyWordsStack = createStackNavigator();
const MyWordsNavigator = () => (
    <MyWordsStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <MyWordsStack.Screen name="MyList" component={MyList} />
        <MyWordsStack.Screen name="MyWords" component={MyWords} />
        <MyWordsStack.Screen name="MyPost" component={MyPost} />


    </MyWordsStack.Navigator>
);

const GrammerStack = createStackNavigator();
const GrammerNavigator = () => (
    <GrammerStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <GrammerStack.Screen name="GrammerScreen" component={Grammer} />
        <GrammerStack.Screen name="GrammerPost" component={GrammerPost} />
        <GrammerStack.Screen name="PremiumGrammer" component={PremiumGrammer} />
    </GrammerStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchNavigator = () => (
    <SearchStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <SearchStack.Screen name="DiscoverScreen" component={Discover} />
        <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
        <SearchStack.Screen name="Search" component={Search} />

    </SearchStack.Navigator>
);

export default function HomeScreen() {

    const [premium,setPremium] = useState(false);
    

    const token = useSelector((state) => state.AuthReducers.authToken);

    const getPremium = async () => {

        console.log("GETPremium+")
        try {
            const customerInfo = await Purchases.getCustomerInfo();
    
            console.log(premium)
    
    
    
    
    
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
    })
    
   /*  React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });
    
        return unsubscribe;
    }, [navigation]); */
    return (
        <NavigationContainer>
             {/* <View style={{backgroundColor:"white",height:60}}>
            {premium?<Text>hello+</Text>:<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />}
            </View> */}
            <Tab.Navigator
                barStyle={{ backgroundColor: "black", height: 80 }} //80
                initialRouteName="SearchNavigator"
                screenOptions={{
                    headerShown: false,
                }}

                //tabBarStyle=  { height: 60 }
            >
                <Tab.Screen
                    name="Word"
                    component={MainScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="translate"
                                size={20}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Discover"
                    component={SearchNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="search" size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="My List"
                    component={token? MyWordsNavigator:RootStackScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather
                                name="plus-square"
                                size={20}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Grammer"
                    component={GrammerNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5
                                name="ethereum"
                                size={20}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Me"
                    component={MeNavigator}//token?MeNavigator:RootStackScreen
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
           
        </NavigationContainer>
    );
}
