import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Loading;
