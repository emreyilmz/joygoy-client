import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CountVideo = () => {
    return (
        <View style={styles.container}>
            
           <View style={styles.boxes}>
           <LinearGradient
                            colors={["#1DB954", "#01ab9d"]}
                            style={styles.count}
                        >
            {/* <View style={styles.count}> */}
            <Text style={styles.textCount}>3.354.259</Text>
            <Text style={styles.descriptionCount}>video</Text>

           {/*  </View> */}
            </LinearGradient>
            
            <LinearGradient
                            colors={["red", "red"]}
                            style={styles.count}
                        >
            {/* <View style={styles.count}> */}
            <Text style={styles.textCount}>4.559</Text>
            <Text style={styles.descriptionCount}>film kesiti</Text>

           {/*  </View> */}
            </LinearGradient>
           </View>
        </View>
    );
};

export default CountVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
        
    },
    boxes:{
        width:"90%"
    },
    count:{
        marginTop:20,
        backgroundColor:"blue",
        width:"100%",
        height:65,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems:"center",
        justifyContent:"center"
    },
    textCount:{
        fontWeight:"bold",
        fontSize:25,
        
        color:"white",
    },
    descriptionCount:{
        fontWeight:"medium",
        fontSize:13,
        opacity:0.6,
        color:"white",
    },
});
