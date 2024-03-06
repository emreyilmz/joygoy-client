import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView,Dimensions,FlatList,ActivityIndicator} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const staticImage = require("../../../assets/accept.png");
const cancelImage = require("../../../assets/cancel.png");
const questionImage = require("../../../assets/question.png");
const axios = require("axios");
import { useNavigation } from "@react-navigation/native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import Purchases from "react-native-purchases";

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5283178968139478/3575098172';


const listTab = [
    {
        status:'ALL'
    },
    {
        status:'TENSES'
    },
    {
        status:'A1-A2'
    },
    {
        status:'B1-B2'
    }
]






const Grammer = () => {
    const status3 = [
        {
            name:"Positive",
            status:"positive",
            image:staticImage
        },
        {
            name:"Negative",
            status:"negative",
            image:cancelImage
        },
        {
            name:"Question",
            status:"question",
            image:questionImage
        }
    ]
    const navigation = useNavigation();
    const  [status,setStatus] = useState('ALL')
    const [datalist,setDatalist]=useState([])
    const [data,setData]=useState([])
    const [premium,setPremium] = useState(false);


    const [lists, setLists] = useState([]);

    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    const getMoreData = () => {
        closeActivityIndicator();
        axios
            .get("http://3.73.129.160:8080/grammer")
            .then(function (result) {
                setLoading(true);
                setData(result.data.lists.sort((a, b) => a.sort < b.sort ? -1 : 1))
                setDatalist(result.data.lists.sort((a, b) => a.sort < b.sort ? -1 : 1));
                
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        getMoreData()
    }, []);

    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log("geldi");
            getPremium()
        });

        return unsubscribe;
    }, [navigation]);

    /* useEffect(() => {
        getMoreData()
    }, [status]); */

    const separator = () => {
        return <View  style={{height:1,backgroundColor:"#f1f1f1"}} />
    }
    const setStatusFilter  = async(status) => {
        //10
        
        
        if(status !=='ALL'){
            //5ü
            setData([...datalist.filter(e=>e.status===status)])
        }else {
            setData(datalist)


        }

        setStatus(status)
    }
    

    const renderItem = ({item,index}) => {
        const name =item.name;
        const status = item.status;
        const id = item._id;
        const free = item.free;
        return (
           <>
           {index===0?<View style={styles.free}><Text style={styles.freeText}>FREE</Text></View>:null}
           {index===2?<View style={styles.premium}><Text style={styles.premiumText}>PREMİUM</Text></View>:null}
           {index<2? 
           
           <TouchableOpacity
            key={item._id}
            style={styles.item}
            onPress={() => {
                console.log("hello")
            }}
        >
            
            
            <View style={styles.itemTop}>
             <Text style={[styles.itemText]}>{item.name}</Text>
             <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
             {status3.map((e)=>{
                return (
                    <TouchableOpacity style={styles.boxSmall}
                onPress={() => {
                   navigation.navigate("GrammerPost", {
                    params: {  name, status:item.active==="0"?"positive":e.status, free,id },
                })
               }}>
                
                <Image
                                   style={styles.avatar}
                                   source={item.active==="0"?staticImage:e.image}
                               />
                <Text>{item.active==="0"?"Positive":e.name}</Text>
                
                </TouchableOpacity>
                )
             })}
             
            
             </View>
           </View>
           </TouchableOpacity>:<TouchableOpacity
            key={item._id}
            style={premium?styles.itemNPre:styles.itemPre}
            onPress={() => {
                premium?navigation.navigate("GrammerPost", {
                    params: {  name, status:item.active==="0"?"positive":e.status, free,id },
                }):null
            }}
        >
            <View style={styles.itemTop}>
             <Text style={[styles.itemText]}>{item.name}</Text>
             <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
             {status3.map((e)=>{
                return (
                    <TouchableOpacity style={styles.boxSmall}
                onPress={() => {
                    premium?navigation.navigate("GrammerPost", {
                        params: {  name, status:item.active==="0"?"positive":e.status, free,id },
                    }):navigation.navigate("PremiumGrammer")
               }}>
                
                <Image
                                   style={styles.avatar}
                                   source={item.active==="0"?staticImage:e.image}
                               />
                <Text>{item.active==="0"?"Positive":e.name}</Text>
                
                </TouchableOpacity>
                )
             })}
             
            
             </View>
           </View>
           </TouchableOpacity>}
           </>
        )
    }

    

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
        <View style={styles.container}>
            <View  style={styles.listTab}>
                {
                    listTab.map(e=> {
                      return (
                        <TouchableOpacity style={[styles.btnTab,status === e.status && styles.btnTabActive]}
                        onPress={() => setStatusFilter(e.status)}
                        >
                        <Text style={[styles.textTab,status === e.status && styles.textTabActive]}>{e.status}</Text>
                        </TouchableOpacity>
                      )
                    })
                }
            </View>
            {
            loading?
            <FlatList 
            data={data}
            keyExtractor={(e,i) => i.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={separator}
            />:<View
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
            
        </View>
        </>
    )
}

export default Grammer

const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        /* paddingHorizontal:30, */
        flex:1,
        /* justifyContent:"center", */
    },
    free:{
        marginTop:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:5,
        marginBottom:10,
        marginLeft:15,
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
    premium:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:5,
        marginBottom:10,
        marginLeft:15,
    },
    premiumText:{
        fontWeight:"bold",
        fontSize:16,
        color:"white",
        padding:5,
        paddingHorizontal:15,
        backgroundColor:"#FFB100",
        
        borderRadius:15
    },
    listTab:{
        flexDirection:'row',
        alignSelf:"center",
        /* marginBottom:20, */
        
    },
    btnTab:{
        width:Dimensions.get('window').width/4,
        flexDirection:"row",
        borderWidth:0.5,
        borderColor:'#EBEBEB',
        padding:10,
        justifyContent:"center"
    },  
    textTab:{
        fontSize:16
    },
    textTabActive:{
        color:"#fff",
    },
    itemContainer:{
        flexDirection:'row',
        paddingVertical:15
    },
    itemLogo:{
        padding:10,
    },
    itemImage:{
        width:50,
        height:50
    },
    boxSmall:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:15,
        /* borderWidth: 1,
    borderColor: "thistle",
    borderRadius:220 */

    },
    btnTabActive:{
        backgroundColor:'#E6838D'
    },
    itemTop:{
        flex:1,
        paddingHorizontal:5,
        justifyContent:"center",
        alignItems:"center"
    },
    item: {
        backgroundColor: "#FFF",
        paddingHorizontal: 5,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    itemPre: {
        backgroundColor: "#FFF",
        paddingHorizontal: 5,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        opacity:0.6
    },
    itemNPre: {
        backgroundColor: "#FFF",
        paddingHorizontal: 5,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        marginTop:18,
        flexDirection:"row",
        height: 30,
        width:30,
        borderRadius: 55,
        marginRight: 15,
        borderWidth:  1,  
        borderStyle:  'dashed'
    },

    itemText: {
        maxWidth: "100%",
        fontWeight: "bold",
        fontSize:16,
        opacity:0.7,
    },
    circular: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 5,
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
});
