import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Svg, Text as SvgText } from "react-native-svg"; // Add Svg and SvgText
import styles from "./PartPointProgressStyle";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import { getLastTenDayPoint } from "src/actions/points/points";

const chartConfig = {
  backgroundGradientFrom: "#EEEEEE",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#EEEEEE",
  backgroundGradientToOpacity: 0,
  fillShadowGradientFrom: "#FF675B",
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientTo: "#FFFFFF",
  fillShadowGradientToOpacity: 0.2,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, 0)`,
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
  formatYLabel: (value: any) => {
    const roundedValue = Math.ceil(value / 1000) * 1000;
    return roundedValue.toString();
  },
};

const windowWidth = Dimensions.get("window").width;

type Props = {
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
};

export default function PartPointProgress({ isLoading, setIsLoading }: Props) {
  const [chartData, setChartData] = useState({
    labels: ["01", "02", "03", "04", "05", "06", "07"],
    datasets: [
      {
        data: [10, 20, 25, 10, 30, 20, 25],
        color: (opacity: any) => `rgba(130, 112, 246, ${opacity})`,
        strokeWidth: 2,
        withDots: false,
        key: 1,
        strokeDashArray: [5, 5],
        strokeDashOffset: 0,
      },
    ],
  });

  const [rerender, forceRerender] = useState(false);
  const [showGraph, setShowGraph] = useState(true);

  const getTenDays = async () => {
    setIsLoading(true);
    const response: number[] = await getLastTenDayPoint();
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    getTenDays()
      .then((response) => {
        console.log("!Get Ten day End");

        const today = new Date();
        const labels = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return `${date.getMonth() + 1}-${date.getDate()}`;
        }).reverse();

        console.log(response);
        let show = false;
        const data1 = response
          .slice(0, 5)
          .map((item) => {
            const point = parseFloat(item);
            if (point != 0) show = true;
            return isFinite(point) ? point : 0;
          })
          .reverse();

        setShowGraph(show);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: [...data1],
              color: (opacity: any) => `rgba(130, 112, 246, ${opacity})`,
              strokeWidth: 2,
              withDots: false,
              key: 1,
              strokeDashArray: [5, 5],
              strokeDashOffset: 0,
            },
          ],
        });

        console.log([...data1]);
        forceRerender(!rerender);

        console.log("!Rerender");
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  const handlePress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const barWidth =
      (windowWidth - scale(80)) / chartData.datasets[0].data.length;
    const barIndex = Math.floor(locationX / barWidth);

    if (barIndex >= 0 && barIndex < chartData.datasets[0].data.length) {
      console.log("Y value:", chartData.datasets[0].data[barIndex]);
    }
  };

  // Function to render bar values on top
  const renderBarValues = () => {
    return chartData.datasets[0].data.map((value, index) => {
      const barWidth =
        (windowWidth - scale(150)) / chartData.datasets[0].data.length;
      const barX = index * barWidth + barWidth / 2; // center the label
      return (
        <SvgText
          key={`label-${index}`}
          x={barX + verticalScale(80)}
          y={verticalScale(10)} // Adjust Y position above the bars
          fill="#FF675B"
          fontSize="12"
          textAnchor="middle"
        >
          {value}
        </SvgText>
      );
    });
  };

  return (
    <View style={styles.container}>
      {showGraph ? (
        <>
          <Text style={styles.title}>Recent Activity</Text>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {/* <Svg height="10" width={windowWidth - scale(80)}>
                {renderBarValues()}
              </Svg> */}
              <BarChart
                data={chartData}
                width={windowWidth - scale(80)}
                height={verticalScale(280)}
                fromZero
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={0}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "poppins-regular",
              fontSize: moderateScale(16),
            }}
          >
            {`No recent score.\nPlease play some games!`}
          </Text>
        </View>
      )}
    </View>
  );
}
