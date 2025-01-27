// import React, { useEffect, useState } from "react";
// import { Alert, StyleSheet, View } from "react-native";
// import Swiper from "react-native-swiper";
// import { getAllSliders } from "src/actions/slider/slider";

// import { moderateScale, scale, verticalScale } from "src/config/scale";

// import Slide1 from "./Slide1";
// import { useSelector } from "react-redux";

// // Define the type for a slide
// type Slider = {
//     title: string;
//     content: string;
// };
// const slides = [
//     { id: 1, text: 'Slide 1' },
//     { id: 2, text: 'Slide 2' },
//     { id: 3, text: 'Slide 3' },
// ];

// export default function SwiperSection() {
//     const [slides, setSlides] = useState<Slider[]>([]);
//     const sliderIndex: { id: number; }[] = [];

//     useEffect(() => {
//         const fetchSliders = async () => {
//             try {
//                 const sliderdata = await getAllSliders();
//                 const formattedSlides: Slider[] = sliderdata.sliders.map((slider: { title: any; content: any; }) => ({
//                     title: slider.title,
//                     content: slider.content,
//                 }));
//                 setSlides(formattedSlides);
//                 for (var i = 1; i < formattedSlides.length + 1; i++) {
//                     sliderIndex.push({id: i});
//                 }
//             } catch (error) {
//                 console.error("Error fetching sliders:", error);
                
//             }
//         };

//         fetchSliders();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Swiper
//                 loop={true}
//                 dot={<View style={styles.dot} />}
//                 activeDot={<View style={styles.activeDot} />}
//                 paginationStyle={{ bottom: scale(250) }}
//                 index={0}
//             >
//                 {sliderIndex.map((slide) => (
//                     <View key={slide.id}>
//                         <Slide1 title={slides[slide.id - 1].title} content={slides[slide.id - 1].content} />
//                     </View>
//                 ))}
//             </Swiper>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     dot: {
//         backgroundColor: 'rgba(0,0,0,.2)',
//         width: "12%",
//         height: moderateScale(8),
//         borderRadius: moderateScale(4),
//         margin: moderateScale(3),
//     },
//     activeDot: {
//         backgroundColor: '#87C6E8',
//         width: "25%",
//         height: moderateScale(8),
//         borderRadius: moderateScale(4),
//         margin: moderateScale(3),
//     },
// });
// import React, { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import Swiper from "react-native-swiper";

// import { moderateScale, scale, verticalScale } from "src/config/scale";

// import Slide1 from "./Slide1";
// import Slide2 from "./Slide2";
// import Slide3 from "./Slide3";
// type Slider = {
//     title: string;
//     content: string;
// };

// const slides = [
//     { id: 1, text: 'Slide 1' },
//     { id: 2, text: 'Slide 2' },
//     { id: 3, text: 'Slide 3' },
// ];

// type SwiperSectionProps = {
//     sliderData: Slider[]; // Expecting an array of Slider objects
// };

// export default function SwiperSection({ sliderData }: SwiperSectionProps) {
//     const [sliderIndex, setSliderIndex] = useState<{ id: number }[]>([]);
//     useEffect(() => {
//         if (sliderData.length > 0) {
//           // Map sliderData to indices and update state
//           const indices = sliderData.map((_, index) => ({ id: index + 1 }));
//           setSliderIndex(indices);
//         }
//       }, [sliderData]);
//     return (
//         <>
//             <View style={styles.container}>
//                 <Swiper
//                     loop={true}
//                     dot={<View style={styles.dot} />}
//                     activeDot={<View style={styles.activeDot} />}
//                     paginationStyle={{ bottom: scale(250) }}
//                     index={0}
//                 >
//                     {sliderData.map((slide, index) => (
//                         <View key={index + 1}>
//                             <Slide1 title={slide.title} content={slide.content} />
//                         </View>
//                     ))}
//                         {/* {slides.map((slide) => (
//                         <View key={slide.id}>
//                             { slide.id == 1 ? <Slide2 /> : 
//                             slide.id == 2 ? <Slide2 /> : 
//                             slide.id == 3 ? <Slide3 /> : <></>}
//                         </View>
//                     ))} */}
//                     {/* {slides.map((slide) => (
//                         // <View key={slide.id}>
//                         //     <Slide1 title={sliderData[0].title} content={sliderData[0].content} />
//                         // </View>
//                         <View key={slide.id}>
//                             { slide.id == 1 ? <Slide1 title={sliderData[0].title} content={sliderData[0].content} /> : 
//                             slide.id == 2 ? <Slide1 title={sliderData[1].title} content={sliderData[1].content} /> : 
//                             slide.id == 3 ? <Slide1 title={sliderData[2].title} content={sliderData[2].content} /> : <></>}
//                         </View>
//                     ))} */}
//                 </Swiper>
//             </View>
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     dot: {
//         backgroundColor: 'rgba(0,0,0,.2)',
//         width: "12%",
//         height: moderateScale(8),
//         borderRadius: moderateScale(4),
//         margin: moderateScale(3),
//     },
//     activeDot: {
//         backgroundColor: '#87C6E8',
//         width: "25%",
//         height: moderateScale(8),
//         borderRadius: moderateScale(4),
//         margin: moderateScale(3),
//     },
// });
import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

import { moderateScale, scale } from "src/config/scale";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

type Slider = {
    title: string;
    content: string;
};

type SwiperSectionProps = {
    sliderData: Slider[]; // Expecting an array of Slider objects
};

export default function SwiperSection({ sliderData }: SwiperSectionProps) {
    return (
        <View style={styles.container}>
            <Swiper
                loop={true}
                showsPagination={true}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                paginationStyle={{ bottom: scale(250) }}
            >
                {sliderData.map((slide, index) => (
                    <View key={index} style={styles.slide}>
                        {index === 0 && <Slide1 title={slide.title} content={slide.content} />}
                        {index === 1 && <Slide1 title={slide.title} content={slide.content} />}
                        {index === 2 && <Slide1 title={slide.title} content={slide.content} />}
                    </View>
                ))}
            </Swiper>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: "12%",
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        margin: moderateScale(3),
    },
    activeDot: {
        backgroundColor: '#87C6E8',
        width: "25%",
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        margin: moderateScale(3),
    },
});
