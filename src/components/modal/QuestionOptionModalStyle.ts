import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: scale(350),
        backgroundColor: 'white',
        padding: moderateScale(20),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    container: {
        width: '100%',
    },
    dropdownButtonStyle: {
        width: '100%',
        height: scale(48),
        backgroundColor: '#EEE',
        borderRadius: 8,
        // borderWidth: 1,
        borderColor: '#444',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    dropdownButtonTxtStyle: {
        color: '#444',
        textAlign: 'left',
        fontSize: moderateScale(16),
    },
    dropdownButtonIconStyle: {
        color: '#444',
        fontSize: moderateScale(20),
    },
    dropdownMenuStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        backgroundColor: '#FFF',
        borderBottomColor: '#C5C5C5',
        padding: 10,
    },
    dropdownItemTxtStyle: {
        color: '#444',
        textAlign: 'left',
        fontSize: moderateScale(16),
    },
    space1: {
        flexDirection: "row",
        gap: scale(16),
        marginTop: verticalScale(24),
        marginBottom: verticalScale(4),
    },
    buttonContainer: {
        flex: 1,
    },
});

export default styles;
