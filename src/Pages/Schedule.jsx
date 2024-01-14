import React, { useState, useEffect, useRef } from "react";
import '../styles/Schedule.css';
import Schedule1 from "./Schedule1";
const Schedule = () => {

  const tabs = [
    { id: 'tab-1', time: '8am - 10am', title: 'Jamie talks design', schedule: 'Monday - Thursday', description: 'I talk a bunch of rubbish', icon: 'ion-android-color-palette' },
    { id: 'tab-2', time: '10am - 12am', title: 'Arctic Monkeys Live', schedule: 'Monday - Wednesday', description: 'Music for your lug holes', icon: 'ion-music-note' },
    { id: 'tab-3', time: '12am - 4pm', title: 'Steven Fry podcast', schedule: 'Saturday - Sunday', description: 'Steven Fry says words', icon: 'ion-android-microphone' },
    { id: 'tab-4', time: '4pm - 8pm', title: 'Massive event', schedule: 'Monday - Friday', description: 'Some kind of music festival', icon: 'ion-android-bar' },
  ];

  const images = [
    "/gallery_images/1.webp",
    "/gallery_images/2.webp",
    "/gallery_images/3.webp",
    "/gallery_images/4.webp",
    "/gallery_images/5.webp",
    "/gallery_images/6.webp",
    "/gallery_images/7.webp",
    "/gallery_images/8.webp",
    "/gallery_images/9.webp",
    "/gallery_images/10.webp",
    "/gallery_images/11.webp",
    "/gallery_images/12.webp",
    "/gallery_images/13.webp",
    "/gallery_images/14.webp",
    "/gallery_images/15.webp",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [swipe, setSwipe] = useState(null);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setSwipe({ startX: e.clientX, startY: e.clientY });
  };

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleTouchStart = (e) => {
    console.log("touch start beign");
    setSwipe({ startX: e.touches[0].clientX, startY: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (!swipe) return;
    console.log("handletouch kam kiya");
    const deltaX = e.touches[0].clientX - swipe.startX;
    const deltaY = e.touches[0].clientY - swipe.startY;
    if (Math.abs(deltaX) > 10) {
      sliderRef.current.scrollLeft -= deltaX;
    }
  };

  const handleTouchEnd = (e) => {
    if (!swipe) return;
    const deltaX = e.changedTouches[0].clientX - swipe.startX;
    const deltaY = e.changedTouches[0].clientY - swipe.startY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        setCurrentSlide((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else {
        nextSlide();
      }
    }
    setSwipe(null);
  };


  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = currentSlide * sliderRef.current.offsetWidth;
    }
  }, [currentSlide]);

  return (
    <>
        <div className="Schedule-Page">
          <h1 className="Schedule-Page-heading">SF'24 Schedule</h1>
          <div
            className="Image-Slider"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={process.env.PUBLIC_URL + image}
                alt={`slide ${index + 1}`}
                className={index === currentSlide ? 'active' : ''}
              />
            ))}
          </div>
          <p className="Swipe-heading" style={{ fontWeight: "normal" }}>
            Swipe to view
          </p>
          <Schedule1 />
        </div>
    </>
  );
};


export default Schedule;
