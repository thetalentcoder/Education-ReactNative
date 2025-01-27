import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";
import { moderateScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  keyboardcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFDFFF",
  },
  upperGradientContainer: {
    zIndex: -2,
    position: "absolute",
    top: 0,
    width: "100%",
    height: (windowHeight * 65) / 93,
  },
  backgroundCircle1: {
    zIndex: -1,
    position: "absolute",
    top: scale(-10),
    left: scale(-30),
    width: scale(80),
    height: scale(80),
    borderRadius: 1000,
    backgroundColor: "#FFFFFF33",
  },
  backgroundCircle2: {
    zIndex: -1,
    position: "absolute",
    top: scale(-10),
    right: scale(-75),
    width: scale(150),
    height: scale(150),
    borderRadius: 1000,
    backgroundColor: "#FFFFFF24",
  },
  backgroundCircle3: {
    zIndex: -1,
    position: "absolute",
    top: verticalScale(170),
    left: scale(50),
    width: scale(340),
    height: scale(170),
    borderTopLeftRadius: scale(170),
    borderTopRightRadius: scale(170),
    backgroundColor: "#FFFFFF24",
  },
  backgroundSquare: {
    zIndex: -1,
    position: "absolute",
    top: verticalScale(170) + scale(170),
    left: scale(50),
    width: scale(340),
    height: scale(800),
    backgroundColor: "#FFFFFF24",
  },
  sectionLogin: {
    marginTop: verticalScale(80),
    height: verticalScale(600),
    width: "100%",
  },
  sectionStartImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginPanda: {
    aspectRatio: 4,
    width: "80%",
    height: "auto",
    marginTop: verticalScale(120)
  },
  backContainer: {
    position: "absolute",
    top: verticalScale(60),   // Adjust the top position to place it correctly
    left: scale(20),          // Keep the left positioning
    zIndex: 1,             // Ensures it stays on top of other components
    padding: moderateScale(5), // Optional: increase touchable area
    height: 'auto',           // Removes full height
  },
  back: {
    backgroundColor: "white",
    borderRadius: verticalScale(20),
    padding: moderateScale(2),
  },
  
});
