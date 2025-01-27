import React from "react";
import { Text, View, Image } from "react-native";

import styles from "./PartAvatarStyle";
import Balloon from "react-native-balloon";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import { Star } from "src/components/star";

const rankingStars = [
    [
        {
            x: 20,
            y: 10,
            size: 14,
            color: "#FFD967",
        },
        {
            x: 38,
            y: 5,
            size: 14,
            color: "#FFD967",
        },
        {
            x: 2,
            y: 5,
            size: 14,
            color: "#FFD967",
        }
    ],
    [
        {
            x: 10,
            y: 7,
            size: 12,
            color: "#FFD967",
        },
        {
            x: 24,
            y: 7,
            size: 12,
            color: "#FFD967",
        }
    ],
    [
        {
            x: 12,
            y: 10,
            size: 12,
            color: "#FFD967",
        }
    ]
];

type Props = {
    ranking: number,
    name: string,
    score: number,
    imagePath: string,
}

// Function to convert Google Cloud Console URL to GCS direct URL
const convertImageUrl = (url: string) => {
    return url.replace("https://storage.cloud.google.com", "https://storage.googleapis.com");
}

export default function PartAvatar({
    ranking,
    name,
    score,
    imagePath,
}: Props) {
    // Convert the image URL
    const directImageUrl = convertImageUrl(imagePath);

    return (
        <>
            <View style={styles.container}>
                <Text style={{
                    fontFamily: "poppins-semibold",
                    fontSize: ranking == 1 ? moderateScale(16) : moderateScale(14),
                    paddingBottom: moderateScale(8),
                    color: ranking == 1 ? "#FFD967" : "white",
                }}>
                    {name}
                </Text>
                <View style={[
                    styles.avatarContainer,
                    ranking == 1 ? { 
                        width: verticalScale(60), 
                        height: verticalScale(60),
                        borderRadius: verticalScale(30),
                        borderColor: "#4444FF",
                        borderWidth: scale(2),
                        backgroundColor: "#CCCCCC",
                        position: "relative",
                    } : ranking == 2 ? {
                        width: verticalScale(50), 
                        height: verticalScale(50),
                        borderRadius: verticalScale(25),
                        borderColor: "#FF7777",
                        borderWidth: scale(2),
                        backgroundColor: "#CCCCCC",
                        position: "relative",
                    } : {
                        width: verticalScale(40), 
                        height: verticalScale(40),
                        borderRadius: verticalScale(20),
                        borderColor: "#FFD967",
                        borderWidth: scale(2),
                        backgroundColor: "#CCCCCC",
                        position: "relative",
                    }
                ]}>
                    <Image
                        // source={require("assets/images/imgs/profileDefault.png")}
                        source={
                            imagePath
                              ? { uri: convertImageUrl(imagePath) }
                              : 
                              require("assets/images/imgs/profileDefault.png")
                          }
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: ranking == 1 ? verticalScale(30) : ranking == 2 ? verticalScale(25) : verticalScale(20)
                        }}
                    />
                    {
                        rankingStars[ranking - 1].map((star, index) => {
                            return (
                                <View 
                                    key={(index + 1) * ranking}
                                    style={{
                                        position: "absolute",
                                        top: - verticalScale(star.y),
                                        left: verticalScale(star.x),
                                    }}
                                >
                                    <Star
                                        size={moderateScale(star.size)}
                                        color={star.color}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                <Balloon
                    borderColor="transparent"
                    backgroundColor={ranking == 1 ? "#FFD967" : "white"}
                    borderRadius={moderateScale(8)}
                    triangleSize={moderateScale(10)}
                    triangleOffset="40%"
                    width={scale(90)}
                    height={ranking == 1? verticalScale(40) : verticalScale(35)}
                    containerStyle={styles.balloonContainer}
                    >
                    <Text style={[
                        styles.scoreText, 
                        ranking == 1 ? {fontSize: moderateScale(18)} : {fontSize: moderateScale(16)}
                    ]}>
                        {score}
                    </Text>
                </Balloon>
            </View>
        </>
    )
}
