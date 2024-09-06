import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import styles from "./PartRecentQuizzesStyle";
import { PTFELinkButton } from "src/components/button";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    color: "#8270F6",
    percent: "80%",
    title: "Biology and Science",
    qCount: 13,
  },
  {
    color: "#FFD967",
    percent: "90%",
    title: "Math Statistics",
    qCount: 15,
  },
  {
    color: "#FF6DAA",
    percent: "100%",
    title: "Art and Music",
    qCount: 21,
  },
  {
    color: "#A0A0A2",
    percent: "70%",
    title: "Japanese Language",
    qCount: 6,
  },
  {
    color: "#FF6DAA",
    percent: "100%",
    title: "Art and Music",
    qCount: 12,
  },
  {
    color: "#FFD967",
    percent: "90%",
    title: "Math Statistics",
    qCount: 8,
  },
  {
    color: "#A0A0A2",
    percent: "70%",
    title: "Japanese Language",
    qCount: 10,
  },
];

export default function PartRecentQuizzes() {
  const { user } = useSelector((state: any) => state.userData);

  const navigation: any = useNavigation();

  const gotoRecentQuizzes = () => {
    navigation.navigate("Profile", {
      screen: "RecentQuizzes",
    });
  };

  const calculateDaysAgo = (dateString: string) => {
    const quizDate = moment(dateString);
    const today = moment();

    const diffDays = today.diff(quizDate, "days");
    if (diffDays === 0) {
      return "Today";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recent Quizzes</Text>
        <PTFELinkButton
          text="View All >"
          color="#87C6E8"
          underlined={false}
          onClick={gotoRecentQuizzes}
        />
      </View>
      {user?.gamehistory
        .slice(-5)
        .reverse()
        .map((col: any, index: any) => {
          let color = "";
          switch (col.title) {
            case "Classic Mode":
              color = "#8270F6";
              break;
            case "Survivor Mode":
              color = "#FFD967";
              break;
            case "Scenario Mode":
              color = "#FF6DAA";
              break;
            default:
              color = "#A0A0A2";
          }
          return (
            <View key={index} style={styles.oneQuiz}>
              <View style={[styles.icon, { backgroundColor: color }]}></View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{col.title}</Text>
                <View style={styles.column}>
                  <Text style={styles.smallText}>
                    {col.numberOfQuestions == 1
                      ? `${col.numberOfQuestions} Question`
                      : `${col.numberOfQuestions} Questions`}
                  </Text>
                  <Text
                    style={styles.smallText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {col.category}
                  </Text>
                </View>
              </View>
              <View style={[styles.percentContainer]}>
              <Text style={styles.smallText}>
                    {calculateDaysAgo(col.date)}
                  </Text>
                <Text style={[styles.percentText, { color: color }]}>
                  {col.score}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
}
