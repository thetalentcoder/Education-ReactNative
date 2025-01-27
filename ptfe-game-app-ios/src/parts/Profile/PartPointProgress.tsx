import React from "react";
import { View, Text, Dimensions } from "react-native";

import styles from "./PartPointProgressStyle";
import { LineChart } from "react-native-chart-kit";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    datasets: [
      {
        data: [10, 20, 15, 25, 10, 15, 30, 20, 25, 35],
        color: () => '#8270F6',
        strokeWidth: 2,
      },
    ],
};

const gradientColors = ['#7B68EE', '#8A2BE2'];

const windowWidth = Dimensions.get("window").width;

export default function PartPointProgress() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Recent Activity
            </Text>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <LineChart
                    data={data}
                    width={windowWidth - scale(70)}
                    height={verticalScale(280)}
                    withDots={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    withHorizontalLabels={false}
                    transparent={true}
                    fromZero={true}
                    xLabelsOffset={0}
                    chartConfig={{
                        // backgroundColor: "#FFFFFF",
                        fillShadowGradientFrom: "#7250C6",
                        fillShadowGradientFromOpacity: 0.4,
                        fillShadowGradientTo: "#FFFFFF",
                        fillShadowGradientToOpacity: 0,
                        fillShadowGradientToOffset: 0.75,

                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                        labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
                    }}
                    style={{
                        paddingRight: moderateScale(10),
                    }}
                />
            </View>
        </View>
    )
}