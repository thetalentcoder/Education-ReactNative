import { StyleSheet } from "react-native";
import { scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    progressContainer: {
        paddingTop: verticalScale(16),
        paddingHorizontal: scale(32),
        width: "100%",
    },
    RecentPointContainer: {
        paddingTop: verticalScale(48),
        paddingHorizontal: scale(32),
        width: "100%",
    },
})