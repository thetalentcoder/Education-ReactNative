import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
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
    fillShadowGradientFromOffset: 0.5,
    fillShadowGradientTo: "#FFFFFF",
    fillShadowGradientToOpacity: 0.2,
    fillShadowGradientToOffset: 1,
    decimalPlaces: 0,

    // stackedBar: true,

    color: (opacity = 1) => `rgba(255, 255, 255, 0)`,
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
};

const windowWidth = Dimensions.get("window").width;


type Props = {
  isLoading: boolean,
  setIsLoading: (newValue: boolean) => void;
}

export default function PartPointProgress({
  isLoading,
  setIsLoading,
}: Props) {

  const [chatData, setChartData] = useState({
      // labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      labels: ['01', '02', '03', '04', '05', '06', '07'],
      datasets: [
          {
              // data: [10, 20, 15, 25, 10, 15, 30, 20, 25, 35],
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

  const getTenDays = async () => {
      setIsLoading(true);
      const response: number[] = await getLastTenDayPoint();
      setIsLoading(false);
      return response;
  }

  useEffect(() => {
    getTenDays()
      .then((response) => {      
        console.log("!Get Ten day End");

        // Generate dates for the last 10 days
        const today = new Date();
        const labels = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return `${date.getMonth() + 1}-${date.getDate()}`;
        }).reverse(); // Reverse to have the oldest date first
    
        console.log(response);
        // Validate and map server response to data
        const data1 = response.slice(0, 5).map(item => {
          const point = parseFloat(item);
          return isFinite(point) ? point : 0; // Ensure data is valid
        }).reverse();

        setChartData({
          labels: labels,
          datasets: [
              {
                  data: [... data1],
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
      }).catch(() => {

      }).finally(() => {

      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <BarChart
          data={chatData}
          width={windowWidth - scale(80)}
          height={verticalScale(280)}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={{
          }}
        />
      </View>
    </View>
  );
}
