import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image, ListViewBase } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const staticImage = require("../../../assets/crown.png");
import {useTranslation} from 'react-i18next'


const WordList = (props) => {
    const {t,i18n} = useTranslation()
    //console.log(props)
    const navigation = useNavigation();

    useEffect(() => {
        //console.log(props.stepIndex);
    });

    return (
        <View style={styles.box} key={props._id}>
            
            {props.stepIndex===3?<View style={styles.premium}><Text style={styles.premiumText}>PREMİUM</Text></View>:null}

                       
                         
                            <TouchableOpacity 
                            style={props.premium?styles.buttonPre:styles.button }  
                            onPress={() => {
                                props.premium?navigation.navigate("Words", { props }):navigation.navigate("Premium", { props });
                            }}
                            >
                            <Image 
                        source={{
                            uri:
                                "https://aws-phrase-s3.s3.eu-central-1.amazonaws.com/list-image/" +
                                props?.image
                        }}
                        style = {{ width: 40, height: 40
                         }}
                        />
                        <View>
                        <Text style={styles.textCountry}>{props.tr}</Text>
                        <Text style={styles.textCount}>{t('WordCount')}: {props.count}</Text>
                        </View>
                        <View style={{
    }}></View>
                            </TouchableOpacity>
                           
     </View>                       
    );
};

const styles = StyleSheet.create({
    textCountry:{
        fontSize:21,
        fontWeight:"bold",
        marginLeft:10,
        /* marginBottom:5, */
        opacity:0.8,
        
    },
    textCount:{
        fontSize:12,
        marginLeft:10,
        /* marginBottom:5, */
        color:"#808080"
        
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
    premium:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:5,
        marginBottom:-5,
        marginLeft:10,
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
    
    button:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
        opacity:0.6
        
    },
    buttonPre:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
        
    },
});

export default WordList;
