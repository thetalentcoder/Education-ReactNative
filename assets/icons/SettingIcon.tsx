import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from "react-native-svg";
import { scale } from "src/config/scale";

export default function SettingIcon() {
  return (
    <View style={styles.container}>
      <Svg
        fill={"white"}
        id="svg69"
        width="36%"
        height="36%"
        viewBox="0 0 682.66669 682.66669"><Defs
          id="defs73"><ClipPath
            id="clipPath83"><Path
              d="M 0,512 H 512 V 0 H 0 Z"
              id="path81" /></ClipPath></Defs><G
          id="g75"
          transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)"><G
            id="g77"><G
              id="g79"
              clip-path="url(#clipPath83)"><G
                id="g85"
                transform="translate(256,334.6665)"><Path
                  d="m 0,0 c -43.446,0 -78.667,-35.22 -78.667,-78.667 0,-43.446 35.221,-78.666 78.667,-78.666 43.446,0 78.667,35.22 78.667,78.666 C 78.667,-35.22 43.446,0 0,0 Z m 220.802,-22.53 -21.299,-17.534 c -24.296,-20.001 -24.296,-57.204 0,-77.205 l 21.299,-17.534 c 7.548,-6.214 9.497,-16.974 4.609,-25.441 l -42.057,-72.845 c -4.889,-8.467 -15.182,-12.159 -24.337,-8.729 l -25.835,9.678 c -29.469,11.04 -61.688,-7.561 -66.862,-38.602 l -4.535,-27.213 c -1.607,-9.643 -9.951,-16.712 -19.727,-16.712 h -84.116 c -9.776,0 -18.12,7.069 -19.727,16.712 l -4.536,27.213 c -5.173,31.041 -37.392,49.642 -66.861,38.602 l -25.834,-9.678 c -9.156,-3.43 -19.449,0.262 -24.338,8.729 l -42.057,72.845 c -4.888,8.467 -2.939,19.227 4.609,25.441 l 21.3,17.534 c 24.295,20.001 24.295,57.204 0,77.205 l -21.3,17.534 c -7.548,6.214 -9.497,16.974 -4.609,25.441 l 42.057,72.845 c 4.889,8.467 15.182,12.159 24.338,8.729 l 25.834,-9.678 c 29.469,-11.04 61.688,7.561 66.861,38.602 l 4.536,27.213 c 1.607,9.643 9.951,16.711 19.727,16.711 h 84.116 c 9.776,0 18.12,-7.068 19.727,-16.711 l 4.535,-27.213 c 5.174,-31.041 37.393,-49.642 66.862,-38.602 l 25.835,9.678 c 9.155,3.43 19.448,-0.262 24.337,-8.729 L 225.411,2.911 c 4.888,-8.467 2.939,-19.227 -4.609,-25.441 z"
                  fill="white" 
                  stroke="white" 
                  stroke-width="40" stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-dasharray="none"
                  stroke-opacity="1"
                  id="path87" />
              </G>
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: scale(8),
  },
});