import React from "react";
import { View, Text, Image } from "react-native";

import PartStars from "src/parts/Score/PartStars";
import styles from "./SectionScoreStyle";
import Confetti from "src/parts/Score/Confetti";
import StreakModal from "src/parts/Score/StreakModal";
import { PTFEButton } from "src/components/button";

type Props = {
  score: number;
  bShow: boolean;
  total: number;
  mode: string;
};

export default function SectionScore({
  score,
  bShow = false,
  total,
  mode,
}: Props) {
  return (
    <View style={styles.container}>
      {score != 0 && <Confetti />}
      {/* <View style={styles.starContainer}>
                <PartStars />
            </View> */}
      {/* <StreakModal bShow={bShow}/> */}
      {/* <View style={styles.avatarContainer}> */}
      {/* <Image style={styles.avatar} source={require("assets/images/avatar/sample.jpg")}/> */}
      {/* </View> */}
      <Text style={styles.complementText}>{`Great  try!`}</Text>
      <Text style={styles.profileText}>{ mode == 'study' ? 'You got right' : `Your Score is`}</Text>
      <View style={styles.scoreSquare}>
        <Text style={styles.scoreText}>
          {mode === "study" ? (
            <>
              <Text>{score}</Text>
              <Text style={styles.slashText}> / </Text>
              <Text>{total}</Text>
            </>
          ) : (
            <Text>{score}</Text>
          )}
        </Text>
      </View>
    </View>
  );
}
