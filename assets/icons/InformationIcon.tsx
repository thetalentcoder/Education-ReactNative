/*
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
			C512,114.497,397.492,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
			c119.393,0,216,96.615,216,216C472,375.393,375.384,472,256,472z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,214.33c-11.046,0-20,8.954-20,20v128.793c0,11.046,8.954,20,20,20s20-8.955,20-20.001V234.33
			C276,223.284,267.046,214.33,256,214.33z"/>
	</g>
</g>
<g>
	<g>
		<circle cx="256" cy="162.84" r="27"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

*/
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G, Circle } from "react-native-svg";

export default function InformationIcon() {
  return (
    <View style={styles.container}>
        <Svg id="Capa_1" x="0px" y="0px" width={"70%"} height={"70%"}
            viewBox="0 0 512 512" fill={"white"}>
        <G>
            <G>
                <Path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
                    C512,114.497,397.492,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
                    c119.393,0,216,96.615,216,216C472,375.393,375.384,472,256,472z"/>
            </G>
        </G>
        <G>
            <G>
                <Path d="M256,214.33c-11.046,0-20,8.954-20,20v128.793c0,11.046,8.954,20,20,20s20-8.955,20-20.001V234.33
                    C276,223.284,267.046,214.33,256,214.33z"/>
            </G>
        </G>
        <G>
            <G>
                <Circle cx="256" cy="162.84" r="27"/>
            </G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        <G>
        </G>
        </Svg>
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