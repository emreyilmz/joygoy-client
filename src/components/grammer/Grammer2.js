import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import GrammerList from "./GrammerList";

const axios = require("axios");

function Home({ navigation }) {
    const [lists, setLists] = useState([]);
    const [show, setShow] = useState(false);
    console.log("hello", lists);

    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const closeActivityIndicator = () =>
        setTimeout(() => setAnimating(false), 60000);

    useEffect(() => {
        closeActivityIndicator();
        axios
            .get("http://3.73.129.160:8080/grammer")
            .then(function (result) {
                setLoading(true);

                setLists(result.data.lists);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {show ? (
                <View>
                    <Text>hello</Text>
                </View>
            ) : (
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Grammer Subjects</Text>
                    {loading ? (
                        <View style={styles.items}>
                            {lists.map((list, stepIndex) => (
                                <GrammerList
                                    key={list._id}
                                    name={list.name}
                                    color={list.color}
                                    regex={list.regex}
                                    id={list._id}
                                />
                            ))}
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator
                                animating={animating}
                                color="#bc2b78"
                                size="large"
                                style={styles.activityIndicator}
                            />
                            <Text>Yükleniyor</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        height: 100,
    },
    tasksWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    items: {
        marginTop: 30,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
    },
});

export default Home;
