import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import useColorStore from "../Utils/store";
import { ChromePicker } from "react-color";

function ColorContainer({ show, modelParts, colorOptions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const { setColors, colors, setActiveState } = useColorStore();

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    if (show) setActiveState(modelParts[activeIndex]);
  }, [activeIndex]);

  const totalSlides = modelParts.length;

  return (
    <div className='color-container'>
      <div className='slider-color'>
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          centerMode={true}
          centerPadding={"0px"}
          className='slider'
          ref={sliderRef}
          initialSlide={activeIndex}
          afterChange={(index) => setActiveIndex(index)}
        >
          {modelParts.map((part, index) => (
            <div key={index} className='color-card'>
              <div className='color-card-title'>
                <div onClick={handlePrev} style={{ cursor: "pointer" }}>
                  <GrPrevious className='color-card-icon' />
                </div>
                <span>{part}</span>
                <div onClick={handleNext} style={{ cursor: "pointer" }}>
                  <GrNext className='color-card-icon' />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className='colors-div'>
        <div className='color-inner-div'>
          {modelParts[activeIndex] === "Hull Color" ? (
            <div className='color-picker'>
              <ChromePicker
                disableAlpha={true}
                color={colors["Hull Color"]}
                onChange={(color) => {
                  setColors({
                    part: modelParts[activeIndex],
                    hex: color.hex,
                  });
                }}
              />
            </div>
          ) : (
            <>
              {colorOptions[modelParts[activeIndex]] &&
                colorOptions[modelParts[activeIndex]].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <div
                      className='color-box'
                      style={{
                        backgroundColor: item.hex,
                        height: "30px",
                        width: "30px",
                        borderRadius: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setColors(
                          { part: modelParts[activeIndex], hex: item.hex },
                          colors
                        )
                      }
                    ></div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Show slide number indicator at the bottom */}
      <div className='slide-indicator'>
        <div className='slide-indicator-line' />
        {activeIndex + 1}/{totalSlides}
        <div className='slide-indicator-line' />
      </div>
    </div>
  );
}

export default ColorContainer;
