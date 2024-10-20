import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    title: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(16),
        color: "#2C2C2C",
        paddingBottom: verticalScale(8),
    },
    // title: { textAlign: "center", margin: 10 },
    tooltipContainer: {
      position: 'absolute',
      top: 200, // Adjust according to your design
      left: 100, // Adjust to make sure it's close to the clicked bar
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 10,
      borderRadius: 10,
      color: 'white',
    },
});