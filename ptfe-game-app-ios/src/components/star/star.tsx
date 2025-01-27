import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

type Props = {
    size: number;
    color: string;
}

const Star = ({
    size,
    color,
}: Props) => {
  const points = [
    `${0.5 * size},${0 * size}`,
    `${0.65 * size},${0.35 * size}`,
    `${1 * size},${0.4 * size}`,
    `${0.75 * size},${0.65 * size}`,
    `${0.8 * size},${1 * size}`,
    `${0.5 * size},${0.82 * size}`,
    `${0.2 * size},${1 * size}`,
    `${0.25 * size},${0.65 * size}`,
    `${0 * size},${0.4 * size}`,
    `${0.35 * size},${0.35 * size}`,
    `${0.5 * size},${0 * size}`,
  ].join(' ');

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        <Polygon points={points} fill={color} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Star;
