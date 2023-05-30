import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./styles.css";
import ResultStateContext from "./GlobalState";
import ResultImages from "./ResultImages";



function ResultSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { resultData, setResultData, client  } = useContext(ResultStateContext);
  const [activeSlider, setActiveSlider] = useState(0)
  useEffect(()=>{
    const MoreImages = (resultData, active) => {
      let pages
      resultData.total_results%50 === 0? pages = resultData.total_results/50 : pages = resultData.total_results/50 + 1
      pages = parseInt(pages)
      console.log(pages )
      if (active+10 > resultData.imagesArray.length &&resultData.imagesArray.length > 50 && !(resultData.page >=  pages) ){
        client.photos
        .search({
          query: resultData.quote,
          per_page: 50,
          color: resultData.color.replace("#",""),
          size: "large2x",
          page: resultData.page + 1,
        })
        .then((photos) => {
            console.log(photos)
            let result = {...resultData}
            result.imagesArray = [...result.imagesArray,...photos.photos]
            result.page = photos.page
            setResultData(result);
            result = {}
        });
      }
    }
    MoreImages(resultData, activeSlider)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeSlider, resultData.imagesArray])
 
    
  if (resultData){
    return (
      <>
        <Swiper
          onSlideChange={(e)=>{setActiveSlider(e.activeIndex)}}
          id="resultSwiper2"
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="mySwiper2"
        >
          {resultData.imagesArray.map((data, index) => {
            return (<SwiperSlide key={index} >
              <ResultImages src={data.src.large2x} alt={data.alt} />
  
            </SwiperSlide>)
          })}
        </Swiper>
        <Swiper
        allowTouchMove={false}
          id="resultSwiper"
          onSwiper={setThumbsSwiper}
          breakpoints={{
              
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper"
        >
          {resultData.imagesArray.map((data, index) => {
            return (<SwiperSlide key={index}>
              <ResultImages src={data.src.medium} alt={data.alt} />
            </SwiperSlide>)
          })}
        </Swiper>
      </>
    );
  }
  
}

export default ResultSwiper;
