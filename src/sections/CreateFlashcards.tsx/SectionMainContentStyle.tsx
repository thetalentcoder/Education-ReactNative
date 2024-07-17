import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(32),
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        backgroundColor: "#FFF",
    },
    questionInput: {
        height: verticalScale(120),
        width: "100%",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        padding: moderateScale(16),
        marginTop: verticalScale(8),
        fontSize: moderateScale(16),
        backgroundColor: '#f0f0f0',
        color: '#000',
        textAlignVertical: 'top',
    },
    input: {
        height: moderateScale(57.85),
        width: "100%",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingLeft: scale(16),
        paddingRight: moderateScale(16),
        marginTop: verticalScale(16),
        fontSize: moderateScale(16),
        backgroundColor: '#f0f0f0',
        color: '#000',
    },
    textArea: {
        height: moderateScale(150),
        width: "100%",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        padding: moderateScale(16),
        marginTop: verticalScale(16),
        fontSize: moderateScale(16),
        backgroundColor: '#f0f0f0',
        color: '#000',
        textAlignVertical: 'top',
    },
    questionContainer: {
        padding: moderateScale(16),
        marginBottom: verticalScale(16),
        backgroundColor: '#f0f0f0',
        borderRadius: moderateScale(8),
    },
    title :{
        fontSize: moderateScale(18),
        fontFamily: "circular-std-medium",
    },
    content: {
        paddingLeft: scale(8),
        fontSize: moderateScale(16),
        fontFamily: "sf-protext-medium",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: scale(350),
        backgroundColor: 'white',
        padding: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    space: {
        width: "100%",
        marginVertical: verticalScale(20),
    },
    space1: {
        width: "100%",
        marginVertical: verticalScale(12),
    }
});