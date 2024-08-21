import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        padding: scale(28),
        backgroundColor: "white",
    },
    innerContainer: {
    },
    categoryText: {
        fontFamily: "sf-protext-semibold",
        fontSize: moderateScale(16),
    },
    gameModeText: {

    },
    gameModeTextContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryTextContainer: {
        width: "100%",
        justifyContent: "center",
    },
    categorySelect: {
        marginVertical: verticalScale(8),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: verticalScale(8),
        gap: verticalScale(8),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: moderateScale(57.85),
        width: "100%",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: verticalScale(8),
        fontSize: 16,
        backgroundColor: '#f0f0f0',
        color: '#000',
    },
});