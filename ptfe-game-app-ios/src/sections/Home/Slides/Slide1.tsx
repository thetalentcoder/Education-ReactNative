import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./SlideStyle"

type Slide1Props = {
    title: string;
    content: string;
};

export default function Slide1({ title, content }: Slide1Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text_title}>{title}</Text>
            <Text style={styles.text_content}>{content}</Text>
        </View>
    );
}
// import React from "react";
// import { View, Text } from "react-native";

// import texts from "src/config/texts";
// import styles from "./SlideStyle"

// export default function Slide1() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.text_title}>
//                 {texts.txt_screen_home_slider1_title}
//             </Text>
//             <Text style={styles.text_content}>
//                 {texts.txt_screen_home_slider1_content}
//             </Text>
//         </View>
//     );
// }