import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/actions";
import axios from "axios";
import { useSelector } from "react-redux";
import Purchases from "react-native-purchases";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import {useTranslation} from 'react-i18next'

const Me = () => {
    const {t,i18n} = useTranslation()
    const [packages, setPackages] = useState([]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.AuthReducers.authToken);
    

    const buyPackage = async (pack) => {
        try {
            const { customerInfo, productIdentifier } =
                await Purchases.purchasePackage(pack);
            if (
                typeof customerInfo.entitlements.active
                    .my_entitlement_identifier !== "undefined"
            ) {
                console.log("ok");
            }
        } catch (e) {
            if (!e.userCancelled) {
                console.log(JSON.stringify(e));
            }
        }
    };

    const getMoreData = () => {
        /* const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
            .get("http://3.73.129.160:8080/myuser", config)
            .then(function (result) {
                console.log(result.data.user[0].email);
                setUser(result.data.user[0]);
            })
            .catch((err) => {
                console.log(err);
            }); */
    };

    useEffect(() => {
        getMoreData();
    }, []);
    const getPackages = async () => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                console.log(offerings.current.availablePackages);
                setPackages(offerings.current.availablePackages);
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    };

    useEffect(() => {
        console.log("hello 2 ");

        getPackages();
    }, []);
    const submit = () => {
        dispatch(Logout());
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.footer}>

                <Text style={styles.title2}>
                {t('PremiumHeader')}
                </Text>
                <Text style={styles.subTitle2}>
                {t('PremiumDescription')}
                </Text>

                {!packages ? (
                    <ActivityIndicator />
                ) : (
                    packages.map((pack, index) =>
                        index == 0 ? (
                            <View style={styles.blackBox2} key={1}>
                                <Text style={styles.offerTitle2}>
                                    <Text style={styles.bold2}>
                                        {pack.product.priceString}/{t('PremiumMonth')}
                                    </Text>{" "}
                                    {t('PackageSub')}

                                </Text>
                                <TouchableOpacity
                                    onPress={() => buyPackage(pack)}
                                    style={styles.buttonPrimary2}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        {t('BuySub')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{ width: "90%",justifyContent:"center",alignItems:"center" }} key={2}>
                                <Text style={styles.offerTitle2}>
                                    <Text style={styles.bold2}>
                                        {pack.product.priceString}/{t('PremiumYear')}
                                    </Text>{" "}
                                    {t('PackageSub')}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => buyPackage(pack)}
                                    style={styles.buttonSecondary2}
                                >
                                    <Text style={styles.buttonSecondaryText2}>
                                    {t('BuySub')}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.subTitle3}>
                                {t('PremiumCancel')}
                </Text>
                <Text style={styles.subTitle3}>
                                {t('PremiumAddInformation')}
                </Text>
                
                
                            </View>
                        )
                    )
                )}
            </View>
        </ScrollView>
    );
};

export default Me;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        backgroundColor: "white",

        flex: 1,
        padding: 20,
        alignItems: "center",
        paddingTop: 5,
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30,
    },
    signIn: {
        width: 300,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
    },
    textSign: {
        color: "#1DB954",
        fontWeight: "bold",
        marginLeft: 10,
    },
    preSignIn: {
        width: "100%",
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    preTextSign: {
        fontSize: 16,
        fontWeight: "bold",
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14,
    },
    title2: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 15,
    },
    subTitle2: {
        color: "black",
        textAlign: "center",
        marginVertical: 15,
        fontSize: 16,
        lineHeight: 24,
    },
    subTitle3: {
        color: "grey",
        textAlign: "center",
        marginTop: 15,
        fontSize: 16,
        lineHeight: 24,
        opacity:0.9
    },
    blackBox2: {
        borderColor: "#1DB954",
        borderWidth: 3,
        backgroundColor: "white",
        width: "95%",
        alignItems: "center",
        padding: 10,
        marginVertical: 20,
    },
    offerTitle2: {
        color: "black",
        fontSize: 18,
        marginVertical: 15,
    },
    bold2: {
        fontWeight: "bold",
    },
    buttonPrimary2: {
        backgroundColor: "#1DB954",
        width: "90%",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
        margin: 10,
    },
    buttonPrimary3: {
        backgroundColor: "#1DB954",
        width: "90%",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
    },
    buttonSecondary2: {
        borderColor: "#1DB954",
        borderWidth: 3,
        width: "90%",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
        margin: 10,
    },
    buttonSecondaryText2: {
        color: "black",
        fontWeight: "bold",
    },
});
