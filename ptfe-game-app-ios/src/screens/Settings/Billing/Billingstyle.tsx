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
  nextContainer: {
    position: "absolute",
    top: verticalScale(60),   // Adjust the top position to place it correctly
    right: scale(20),          // Keep the left positioning
    zIndex: 1,             // Ensures it stays on top of other components
    padding: moderateScale(5), // Optional: increase touchable area
    height: 'auto',           // Removes full height
  },
  whiteContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

    borderTopLeftRadius: scale(28),
    borderTopRightRadius: scale(28),
    paddingTop: scale(28),
    paddingLeft: scale(24),
    paddingRight: scale(24),
    paddingBottom: scale(45),
    backgroundColor: "white",
},
text_title: {
    fontFamily: 'circular-std-black',
    fontSize: scale(24),
    lineHeight: scale(48),
    textAlign: "center",
    color: "black",
    marginBottom: scale(12),
},
featureContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    // paddingLeft: scale(8),
    // paddingRight: scale(8),
    // paddingTop: scale(28),
  },
  checklist: {
    width: "100%",
    marginBottom: scale(6),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scale(8),
  },
  featureText: {
    marginLeft: scale(20),
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#333333",
  },
  BottomText: {
    marginTop: scale(20),
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#999999",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(6),
    width: "100%",
    gap: scale(16)
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(6),
    width: "100%",
    gap: scale(12)
  },
  toggleButton: {
    flex: 1,
    padding: scale(15),
    // marginHorizontal: scale(6),
    borderRadius: scale(6),
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    
  },
  activeButton: {
    backgroundColor: "#87c6e8",
  },
  toggleText: {
    fontSize: scale(16),
    color: "#555",
    marginLeft: scale(12),
    fontWeight: "bold",
  },
  activeText: {
    color: "#FFFFFF",
  },
  plan1Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  planOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    // padding: scale(16),
    paddingTop: scale(16),
    paddingBottom: scale(16),
    paddingLeft: scale(32),
    paddingRight: scale(1),
    marginVertical: scale(6),
    borderRadius: scale(6),
    width: "100%",
  },
  activePlan: {
    backgroundColor: "#87c6e8",
  },
  planText: {
    fontSize: scale(16),
    color: "#555",
    fontWeight: "bold",
    marginLeft: scale(16),
  },
  smallPlanText: {
    fontSize: scale(16),
    color: "#555",
    marginLeft: scale(16),
  },
  radioCircle: {
    height: scale(28),
    width: scale(28),
    borderRadius: scale(14),
    borderWidth: scale(2),
    borderColor: "#bdbdbe",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  activeRadio: {
    borderColor: "#87c6e8",
  },
  radioSelected: {
    height: scale(12),
    width: scale(12),
    borderRadius: scale(6),
    backgroundColor: "#87c6e8",
  },
  buttonContainer: {
    width: "100%",
    marginTop: scale(6)
    // padding: scale(7),
},
  
});
