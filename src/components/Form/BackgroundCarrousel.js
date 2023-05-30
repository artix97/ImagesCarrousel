import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./BackgroundCarrousel.css";

// import required modules
import { EffectFade, Autoplay } from "swiper";
const BackgroundImageArray = [
  "https://images.pexels.com/photos/2894335/pexels-photo-2894335.jpeg",
  "https://images.pexels.com/photos/2463951/pexels-photo-2463951.jpeg",
  "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg",
  "https://images.pexels.com/photos/2451043/pexels-photo-2451043.jpeg",
];
export default function BackgroundCarrousel(props) {
  return (
    <>
      <Swiper
        id="backgroundSwipe"
        spaceBetween={30}
        effect={"fade"}
        fadeEffect= {{
        crossFade: true

        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        modules={[EffectFade, Autoplay]}
        className="w-full h-full"
      >
        {BackgroundImageArray.map((image, index) => {
          return (
            <SwiperSlide key={index} >
              <img src={image} alt={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {props.children}
    </>
  );
}
