import { Dimensions, StyleSheet } from "react-native";
import { verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    innerContainer: {
        flex: 1,
        width: "100%",

        paddingHorizontal: 24,
    },
    
    lineContainer: {
        paddingHorizontal: verticalScale(32),

        marginTop: verticalScale(8),
        marginBottom: verticalScale(20),

        alignSelf: "center",

        height: 2,
        width: windowWidth - verticalScale(64),

        borderColor: "white",
        backgroundColor: "white",

        opacity: 0.5,
    }
})