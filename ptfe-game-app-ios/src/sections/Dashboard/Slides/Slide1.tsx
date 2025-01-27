import React from "react";
import { View, Text, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-simple-toast';
import { PTFELinkButton } from "src/components/button";
import texts from "src/config/texts";
import styles from "./SlideStyle"

type Props = {
    title: string,
    linkButtonText: string,
    url: string,
}

export default function Slide1({
    title, 
    linkButtonText,
    url
} :Props) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
            >
                <Text style={styles.text_title}>
                    {title}
                </Text>

                <PTFELinkButton
                    text={linkButtonText}
                    color="yellow"
                    underlined={false}
                    onClick={() => {
                        if (url == undefined) {
                            Toast.show(`Could not redirect to the external web page. (Target URL is empty)`, Toast.SHORT );
                        }
                        else {
                            Linking.openURL(url);
                        }
                    }}
                />
            </LinearGradient>
        </View>
    );
}