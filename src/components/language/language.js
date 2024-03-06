import React,{ useEffect, useState } from "react";
import { View, Image,Text, StyleSheet,TouchableOpacity,FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetLanguage } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import {useTranslation} from 'react-i18next'
const axios = require("axios");



const Language = () => {
    const [countries, setCountries] = useState([]);
    const {t,i18n} = useTranslation()
    
    const dispatch = useDispatch();

    useEffect(() => {
        /* AsyncStorage.clear();
        console.log("bura",authLanguage) */
        axios
            .get("http://3.73.129.160:8080/countryAll")
            .then(function (result) {
                console.log(result.data.countries,"hello")
                setCountries(result.data.countries);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

     const Change = async (lang) => {
        i18n.changeLanguage(lang)
        console.log(lang)
        await AsyncStorage.setItem("language", lang);

        const value = await AsyncStorage.getItem("language");
        console.log(value)
        dispatch(SetLanguage(value));
     }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textCountry2}>Select Your Language</Text>
            <View style={styles.box}>
                
           { countries.map((country, stepIndex) => (
                           
                             
                                <TouchableOpacity 
                                onPress={()=>Change(country.code)}
                                style={(stepIndex === country.length - 1) ? styles.book : styles.button}  key={stepIndex}>
                                <Image 
                            source={{
                                uri:
                                    "https://aws-joygoy-s3.s3.eu-central-1.amazonaws.com/flag/" +
                                    country?.image +
                                    ".png",
                            }}
                            style = {{ width: 40, height: 40
                             }}
                            />
                            <Text style={styles.textCountry}>{country.language}</Text>
                            <View style={{
        }}></View>
                                </TouchableOpacity>
                            
                           
                        ))}
           </View>
        </ScrollView>
    );
};

export default Language;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* marginTop:400 */
        padding:22,
        backgroundColor: "#E8EAED",
        alignContent:"center",
        
    },
    textCountry:{
        fontSize:24,
        fontWeight:"bold",
        marginLeft:10,
        /* marginBottom:5, */
        opacity:0.8,
        
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
    box:{
        display:"flex",
        backgroundColor:"white",
        padding:10,
        borderRadius:28,
    marginBottom:15
        
    },
    button:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        borderBottomColor: "#cecece",
        borderBottomWidth: 0.2
        
    },
});