import React, {useState,useRef, useCallback} from "react";
import { Image, View,TextInput, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { AntDesign, Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import {useTranslation} from 'react-i18next'

const starImgCorner = require("../../../assets/star_corner.png");
const starImgFilled = require("../../../assets/star_filled.png");
import * as Linking from 'expo-linking';
import { useNavigation } from "@react-navigation/native";

const Review = () => {
   

    const {t,i18n} = useTranslation()

    const [defaultRating,setdefaultRating] = useState(2)
    const [maxRating,setmaxRating] = useState([1,2,3,4,5])
    const [additionalComments, setAdditionalComments] = useState("");

    const inputEl = useRef(null);

   /*  const handleInputSubmit = useCallback((ev) => {
        const input =  ev.nativeEvent.text;

    // validate all you want here

      setAdditionalComments(input)
      console.log(additionalComments)
    }, [setAdditionalComments]); */


    const [visible,setVisible]= React.useState(false);
    const navigation = useNavigation();
    let handleReview = () => {
        const androidPackageName = 'com.Joygoy.Joygoy';
    // Open the Android Play Store in the browser -> redirects to Play Store on Android
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
    );
    // Open the Android Play Store directly
    Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);

        
      };

      const handleAdditionalCommentsChanged = (text) => {
        setAdditionalComments(text);
      };
  


    const ModalPopup = ({visible,children}) => {
        const [showModal,setShowModal]=React.useState(visible)
        React.useEffect(()=>{
            toggleModal();
        },[visible])

        const toggleModal = () => {
            if(visible){
                setShowModal(true);
            }else {
                setShowModal(false);
            }
        }

        return <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <View style={[styles.modalContainer]}>{children}</View>
            </View>
        </Modal>
    };



   
    

    return (
        <View style={styles.containerMain}>
            <TouchableOpacity
                                style={styles.goBack}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="arrowleft"
                                    size={28}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <View style={styles.container}>
            <Text style={styles.textStyle}>{t('Review_Header')}</Text>
            <View style={styles.customRatingBarStyle}>
                <ModalPopup visible={visible}>
                    <View style={{alignItems:'flex-start'}}>
                        <View style={styles.header}>
                            <Image 
                            style={{height:70,width:70}}
                            source={require('../../../assets/good-review.png')} />
                         
                        
                        </View>
                        <View style={styles.textAreaContainer} >
    <TextInput
        /*   value={text} */

      style={styles.textArea}
      underlineColorAndroid="transparent"
      /* placeholder={t('Review_PlaceHolder')} */
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
      placeholder={t('Review_PlaceHolder')}
      /* onEndEditing={ handleInputSubmit } */
      /* defaultValue={additionalComments} */
     /*  onChangeText={handleAdditionalCommentsChanged} */


/>
    
  </View>
  
                    </View>
                    <View style={{marginTop:20,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                    <TouchableOpacity
                activeOpacity={0.7}
                style={styles.okeyTextStyle}
                onPress={() => setVisible(false)}
            >
                <Text >{t('Review_CancelButton')}</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.okeyStyle}
                onPress={() => navigation.goBack()}
            >
                <Text style={{color:"white"}}>{t('Review_SendButton')}</Text>
            </TouchableOpacity>  
                    </View>
                </ModalPopup>
                {
                    maxRating.map((item,key)=>{
                        return (
                            <TouchableOpacity
                                onPress={()=>setdefaultRating(item)}
                                activeOpacity={0.7}
                                key={item}
                            >
                                <Image
                                style={styles.starImgStyle}
                                source={
                                    item <= defaultRating
                                    ? starImgFilled
                                    : starImgCorner
                                }
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Text style={styles.textStyle}>
                {defaultRating+'/'+maxRating.length}
            </Text>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={()=>defaultRating>4?handleReview():setVisible(true)}
            >
                <Text style={{color:"white",fontWeight:"bold"}}>{t('Review_rate')}</Text>
            </TouchableOpacity>

        </View>
        </View>
    );
};

export default Review;

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        margin:10,
        justifyContent:"center",

    },
    container: {
        flex: 1,
        margin:10,
        justifyContent:"center",

    },
    goBack:{
        paddingTop:20,
        paddingLeft:10,


    },
    textStyle:{
        textAlign:'center',
        fontSize:23,
        marginTop:20
    },
    customRatingBarStyle:{
        justifyContent:"center",
        flexDirection:"row",
        marginTop:30
    },
    starImgStyle:{
        width:40,
        height:40,
        resizeMode:'cover'
    },
    buttonStyle:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        padding:15,
        borderRadius:8,
        backgroundColor:"green"
    },
    okeyStyle:{
        justifyContent:"center",
        alignItems:"center",
        /* marginTop:10, */
        padding:15,
        backgroundColor:"green",
        borderRadius:18
    },
    okeyTextStyle:{
        marginRight:45,
        opacity:0.5,
        color:"pink",
        padding:15,
    },
    modalBackGround:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        width:'80%',
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
        elevation:20,
    },
    header:{
        width:'100%',
        height:70,
        paddingBottom:10,
        justifyContent:"center",
        alignItems:'center',
    },
    textAreaContainer: {
        width:'100%',
        borderColor: "#B2BEB5",
        borderWidth: 1,
        padding: 15,
        borderRadius:10
      },
      textArea: {
        width:'100%',
        textAlignVertical: 'top',
      }
});
