import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const baseWidth = 430;
const baseHeight = 932;

const screenSize = Math.sqrt(width * height) / 100;

const scale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
size + (scale(size) - size) * factor;


export { scale, verticalScale, moderateScale, screenSize };