"use client";

import React, { useState, useEffect } from "react";

interface ResponsiveSetting {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
}

interface MainSliderProps {
  slides: React.ReactNode[];
  dots?: boolean;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: ResponsiveSetting[];
}

const MainSlider: React.FC<MainSliderProps> = ({
  slides = [],
  dots = false,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 3000,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  responsive = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSettings, setCurrentSettings] = useState({
    slidesToShow,
    slidesToScroll,
  });

  useEffect(() => {
    const updateSettings = () => {
      const screenWidth = window.innerWidth;

      // Sort responsive breakpoints in ascending order
      const sortedResponsive = [...responsive].sort(
        (a, b) => a.breakpoint - b.breakpoint
      );

      // Find the first matching breakpoint
      const matchedSetting = sortedResponsive.find(
        (r) => screenWidth <= r.breakpoint
      );

      const newSettings = matchedSetting
        ? matchedSetting.settings
        : { slidesToShow, slidesToScroll };

      // Only update if settings have changed
      if (
        newSettings.slidesToShow !== currentSettings.slidesToShow ||
        newSettings.slidesToScroll !== currentSettings.slidesToScroll
      ) {
        setCurrentSettings(newSettings);
      }
    };

    updateSettings(); // Initial settings

    // Handle resize
    const handleResize = () => {
      updateSettings();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [responsive, slidesToShow, slidesToScroll, currentSettings]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, currentIndex, currentSettings]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex =
        Math.ceil(slides.length / currentSettings.slidesToScroll) - 1;
      return prevIndex >= maxIndex ? (infinite ? 0 : prevIndex) : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex =
        Math.ceil(slides.length / currentSettings.slidesToScroll) - 1;
      return prevIndex <= 0 ? (infinite ? maxIndex : prevIndex) : prevIndex - 1;
    });
  };

  return (
    <div className="relative   w-full overflow-x-hidden">
      <div
        className="flex transition-transform ease-in-out"
        style={{
          transform: `translateX(-${
            (100 / currentSettings.slidesToShow) * currentIndex
          }%)`,
          transitionDuration: `${speed}ms`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 overflow-x-hidden"
            style={{ width: `${100 / currentSettings.slidesToShow}%` }}
          >
            {/* {index >= currentIndex &&
            index < currentIndex + currentSettings.slidesToShow ? (
              slide
            ) : (
              <div className="placeholder flex items-center justify-center w-full h-full font-extrabold text-lg">
                {" "}
                ROyal Defence Academy
              </div>
            )} */}
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
