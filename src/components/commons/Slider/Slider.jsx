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
    infinite: totalSlides > slidesToShow,
    speed: 500,

    slidesToShow,
    slidesToScroll: 1,
    centerMode: false, // forzar izquierda
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
          infinite: totalSlides > 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          infinite: totalSlides > 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          infinite: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container group/slide lg:px-12 max-lg:px-4 relative">
      <div className="absolute max-lg:w-20 lg:w-30 h-full left-0 bg-gradient-to-l to-blackInter/80 to-65% z-9 pointer-events-none" />
      <div className="absolute max-lg:w-20 lg:w-30 h-full right-0 bg-gradient-to-r to-blackInter/80 to-65% z-9 pointer-events-none" />
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
      className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 lg:group-hover/slide:opacity-100 lg:group-hover/slide:scale-100 lg:scale-0 transition-all ease-in-out"
      onClick={onClick}
    >
      <i className="w-12 h-12 inline-block">
        <img
          className="size-full object-contain"
          src="/iconos/next.svg"
          alt=""
        />
      </i>
    </div>
  );
};

const SamplePrevArrow = ({ onClick, disabled }) => {
  if (disabled) return null;
  return (
    <div
      className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 lg:group-hover/slide:opacity-100 lg:group-hover/slide:scale-100 lg:scale-0 transition-all ease-in-out"
      onClick={onClick}
    >
      <i className="w-12 h-12 inline-block rotate-180">
        <img
          className="size-full object-contain"
          src="/iconos/next.svg"
          alt=""
        />
      </i>
    </div>
  );
};
