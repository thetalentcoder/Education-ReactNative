import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G, Defs, ClipPath, Mask, Rect } from "react-native-svg";

export default function StudyModeIcon() {
  return (
    <View style={styles.container}>
      <Svg id="Capa_1" fill="white" enable-background="new 0 0 32 32" height="70%" viewBox="0 0 32 32" width="70%" xmlns="http://www.w3.org/2000/svg">
      <Path d="m29.299 22.706v-8.305l.237-.138c.503-.292.803-.813.803-1.394s-.3-1.103-.803-1.395l-12.157-7.062c-1.023-.596-2.296-.595-3.319 0l-12.158 7.063c-.502.292-.802.813-.802 1.394s.3 1.102.802 1.395l3.686 2.142v4.979c0 1.156.622 2.231 1.622 2.808l5.074 2.925c1.059.61 2.247.916 3.435.916s2.375-.305 3.435-.916l5.073-2.925c1.001-.576 1.623-1.652 1.623-2.808v-4.98l1.649-.958v7.259c-.423.288-.701.773-.701 1.324 0 .884.717 1.601 1.601 1.601s1.601-.717 1.601-1.601c0-.55-.278-1.035-.701-1.324zm-5.248-1.322h-.001c0 .514-.275.992-.721 1.248l-5.073 2.925c-1.564.901-3.509.901-5.072 0l-5.074-2.925c-.445-.256-.721-.734-.721-1.248v-3.933l6.671 3.876c.512.297 1.086.446 1.66.446s1.148-.148 1.66-.446l6.671-3.876zm-7.576-1.613c-.466.271-1.045.271-1.511 0l-11.879-6.902 11.878-6.902c.466-.271 1.045-.271 1.511 0l11.879 6.901z"/></Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});