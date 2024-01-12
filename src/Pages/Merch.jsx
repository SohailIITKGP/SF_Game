import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "../styles/Merch.css";
import { Autoplay, EffectCards } from "swiper/modules";
import { useEffect, useState, useRef } from "react";

import arrow from "../temp-imgs/merch-right-arrow.png";

import merch1front from "../temp-imgs/merch1front.png";
import merch2front from "../temp-imgs/merch2front.png";
import merch1back from "../temp-imgs/merch1back.png";
import merch2back from "../temp-imgs/merch2back.png";


const Merch = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };
  const [modalState, setmodalState] = useState(false);
  const SwiperRef = useRef(0);

  const [back, setBack] = useState(false);

  const handleMerchModal = () => {
    setmodalState(!modalState);
  };


  const moveLeft = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex + 1) % imageArray.images.length
    );
  };

  const moveRight = () => {
    setCurrentSlideIndex(
      (prevIndex) =>
        (prevIndex - 1 + imageArray.images.length) % imageArray.images.length
    );
  };

  //   const merchback = {
  //     images: [back1, back2, back3, back4],
  //   };

  useEffect(() => {
    console.log("current slide index :", currentSlideIndex);
  }, [currentSlideIndex]);

  const [imageArray, setImageArray] = useState({
    images: [merch1front, merch2front],
  });
  const [backimageArray, setbackimageArray] = useState({
    images: [merch1back, merch2back],
  });

  return (
    <>
      <div className="merch-container">
        <h1>MERCH</h1>
        <div className="merch-content-container">
        <div className="merch-swipe-container">
          <img
            onClick={moveRight}
            className="merch-leftarrow"
            src={arrow}
          />
          <Swiper
            ref={SwiperRef}
            effect={"cards"}
            grabCursor={true}
            className="merch-swiper"
            loop={true}
            autoplay={{
              delay: 15500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, EffectCards]}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {imageArray.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    back
                      ? backimageArray.images[currentSlideIndex]
                      : imageArray.images[currentSlideIndex]
                  }
                  alt={`Slide ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            onClick={moveLeft}
            className="merch-rightarrow"
            src={arrow}
          />
        </div>
        {/* <div className="RegisterNow">
          <button>Buy Now</button>
        </div> */}
        <div className="container_4">
          {back &&
            imageArray.images.map((image, index) => (
              <div className={index == currentSlideIndex ? "Sub-active" : "Sub-nonactive"}>
                <img
                  onClick={() => 
                    setBack(!back)}
                  src={image}
                  alt={`Slide ${index}`}
                />
              </div>
            ))} 
          {!back && 
            backimageArray.images.map((image, index) => (
              <div className={index == currentSlideIndex ? "Sub-active" : "Sub-nonactive"}>
                <img
                  onClick={() => {
                    setBack(!back);
                    console.log(back);
                  }}
                  src={image}
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default Merch;