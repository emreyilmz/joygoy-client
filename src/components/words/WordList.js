import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image, ListViewBase } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const staticImage = require("../../../assets/crown.png");
import {useTranslation} from 'react-i18next'



const WordList = (props) => {
    //console.log(props)
    const {t,i18n} = useTranslation()

    const navigation = useNavigation();

    useEffect(() => {
        //console.log(props.stepIndex);
    });

    return (
        <View style={styles.box}  key={props.key}>
            
      
            {props.stepIndex===0?<View style={styles.free}><Text style={styles.freeText}>FREE</Text></View>:null}
                         
                            <TouchableOpacity 
                            style={props.stepIndex===2?styles.buttonN:styles.button }  
                            onPress={() => {
                                navigation.navigate("Words", { props });
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
    free:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:5,
        marginBottom:-5,
        marginLeft:10,
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
    
    button:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2,
        
    },
    buttonN:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        marginBottom:-5
        
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
