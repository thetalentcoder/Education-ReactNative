import { StyleSheet } from "react-native";

import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        marginTop: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_title: {
        fontFamily: 'circular-std-black',
        fontSize: scale(38),
        lineHeight: scale(48),
        textAlign: "center",
        color: "#555555",
        marginBottom: scale(8),
    },
    text_content: {
        fontFamily: 'circular-std-medium',
        fontSize: scale(18),
        lineHeight: scale(26),
        textAlign: "center",
        color: "#555555",
    }
});