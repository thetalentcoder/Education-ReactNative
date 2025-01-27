import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

type Props = {
  greeting: string;
  userName: string;
  avatar: string;
};

const PTFEAvatar = ({ greeting, userName, avatar }: Props) => {
  const navigation: any = useNavigation();
  const convertImageUrl = (url: string) => {
    return url.replace(
      "https://storage.cloud.google.com",
      "https://storage.googleapis.com"
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarCircle}
        onPress={async () => {
          navigation.navigate("Profile");
        }}
      >
        <Image
          style={styles.avatar}
          source={
            avatar
              ? { uri: convertImageUrl(avatar) }
              : 
              require("assets/images/imgs/profileDefault.png")
          }
        />
      </TouchableOpacity>
      <View style={styles.userInfoContainer}>
        {/* <Text style={styles.greeting}>{"Welcome!"}</Text> */}
        <View style={styles.greetingCombine}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.username}>{userName.split(" ")[0]}</Text>
        </View>
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
    backgroundColor: "#FF675B",
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
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  greetingCombine: {
    flex: 1,
    flexDirection: "column",
  },
  greeting: {
    fontFamily: "circular-std-medium",
    fontSize: moderateScale(17),
    color: "white",
  },
  username: {
    fontFamily: "circular-std-black",
    fontSize: moderateScale(16),
    color: "#565656",
  },
});

export default PTFEAvatar;
