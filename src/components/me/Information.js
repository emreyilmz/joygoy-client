import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Information = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Diller, anadili İngilizce olanların uymaya çalıştığı ideal sistemler değildir. Diller aslında konuşulan şeydir. Joygoy'un bu kadar kullanışlı olmasının nedeni tam da bu. Size, dillerin kural olarak doğru olanı yerine gerçek insanlar tarafından ve bağlam içinde nasıl konuşulduğu hakkında hızlı, tarafsız cevaplar verir.

Amerikan devlet görevlileri tarafından yapılmış basın açıklamaları ile yüzbinlerce video arasından öğrenmeniz gereken kelimeleri cümle içinde öğreneceksiniz. İsterseniz çeviriyi kapatıp kafanızda türkçeye çevirebilirsiniz, isteseniz de türkçe ingilizce altyazıyı kapatıp türkçe çeviriyi kafanızda ingilizceye çevirip öyle öğrenebilirsiniz.
</Text>
        </View>
    );
};

export default Information;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        padding:20
    },
    text:{
        fontWeight:"medium",
        fontSize:17
    }
});
