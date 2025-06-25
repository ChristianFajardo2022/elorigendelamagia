import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

export const SliderCampaing = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();

  const totalSlides = React.Children.count(children);
  const slidesToShow = 4; // podrías hacerlo dinámico según `responsive`

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide >= totalSlides - slidesToShow;

  const settings = {
    dots: false,
    centerMode: true,
    infinite: true,
    centerPadding: "20",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
      <SampleNextArrow
        onClick={() => sliderRef.current?.slickNext()}
        disabled={isLastSlide}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        onClick={() => sliderRef.current?.slickPrev()}
        disabled={isFirstSlide}
      />
    ),
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container group/slide px-12 relative">
      {/* <div className="absolute w-30 h-full left-0 bg-gradient-to-l to-black to-65% z-9" /> */}
      <div className="absolute w-30 h-full right-0 bg-gradient-to-r to-black to-65% z-9" />
      <Slider {...settings} ref={sliderRef}>
        {children}
      </Slider>
    </div>
  );
};

// Componentes flecha
const SampleNextArrow = ({ onClick, disabled }) => {
  if (disabled) return null;
  return (
    <div
      className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 group-hover/slide:opacity-100 group-hover/slide:scale-100 scale-0 transition-all ease-in-out"
      onClick={onClick}
    >
      siguiente
    </div>
  );
};

const SamplePrevArrow = ({ onClick, disabled }) => {
  if (disabled) return null;
  return (
    <div
      className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 group-hover/slide:opacity-100 group-hover/slide:scale-100 scale-0 transition-all ease-in-out"
      onClick={onClick}
    >
      atrás
    </div>
  );
};
