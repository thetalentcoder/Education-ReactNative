import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: verticalScale(28),
  },
  userInfoContainer: {
    position: "relative",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: verticalScale(32),
  },
  flameButtonContainer: {
    flexDirection: "row",
  },
  flameIconButton: {
    width: verticalScale(38),
    height: verticalScale(38),
    paddingTop: verticalScale(3),
    alignItems: "flex-end",
  },
  flameIcon: {
    width: verticalScale(48),
    height: verticalScale(32),
    resizeMode: "center",
    opacity: 0.7,
  },
  streakTextContainer: {
    // position: "absolute",
    height: verticalScale(32),
    marginRight: verticalScale(8),
    top: 0,
    left: 0,
    zIndex: 1,

    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "red",
  },
  streakText: {
    fontFamily: "circular-std-medium",
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    zIndex: 2,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row", // Added to arrange items horizontally
    marginLeft: 8,
    justifyContent: "center", // Align children in the center of the container
    alignItems: "center", // Align items vertically in the center
    width: verticalScale(100),
    height: verticalScale(36),
    borderRadius: verticalScale(18),
    backgroundColor: "#FF675B",
    paddingHorizontal: 10, // Added padding to avoid content touching the edges
  },
  scoreText: {
    fontFamily: "circular-std-medium",
    color: "white",
    fontSize: moderateScale(13),
  },
  ninjaStar: {
    height: verticalScale(20),
    width: 'auto',
    marginRight: 5,
  }
});
