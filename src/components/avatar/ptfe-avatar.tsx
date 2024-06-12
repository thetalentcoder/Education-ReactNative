import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { moderateScale, verticalScale } from 'src/config/scale';

const windowHeight = Dimensions.get("window").height;

type Props = {
  greeting: string;
  userName: string;
}

const PTFEAvatar = ({
  greeting,
  userName,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarCircle} >
        {/* <Image style={styles.avatar} source={require("assets/images/avatar/sample.jpg")}/> */}
      </TouchableOpacity>
      <View style={styles.userInfoContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.username}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  avatarCircle: {
    backgroundColor: "#CACACA",
    width: verticalScale(56),
    height: verticalScale(56),
    borderRadius: verticalScale(28),
  },
  avatar: {
    width: verticalScale(56),
    height: verticalScale(56),
    borderRadius: verticalScale(28),
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 16,
    paddingVertical: 6,
  },
  greeting: {
    fontFamily: 'circular-std-medium',
    fontSize: moderateScale(15),
    color: "white",
  },
  username: {
    fontFamily: 'circular-std-black',
    fontSize: moderateScale(18),
    color: "#565656",
  },
});

export default PTFEAvatar;
