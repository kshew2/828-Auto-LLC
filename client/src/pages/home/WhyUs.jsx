import React, { useEffect, useRef, useState } from "react";
import cardriving from "../../assets/gifs/cardriving.gif";
import carwithplus from "../../assets/gifs/carwithplus.gif";
import keys from "../../assets/gifs/keys.gif";
import truckdriving from "../../assets/gifs/truckdriving.gif";
import speedometer from "../../assets/gifs/speedometer.gif";
const WhyUs = () => {
  const [isInView, setIsInView] = useState(false);
  const animatedBlockRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing after animation triggers
        }
      },
      { threshold: 0.1 }
    );

    if (animatedBlockRef.current) {
      observer.observe(animatedBlockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex justify-center flex-col mx-auto">
      <div className="bg-white text-center h-2/4 py-16 w-10/12 mx-auto">
        <h1 className="w-11/12 xl:text-8xl lg:text-7xl md:text-7xl text-5xl xl:mb-6 mb-6 font-semibold text-center mx-auto text-bgdark font-primary">
          Why choose 828 AUTO LLC?
        </h1>
        {/* Animated Block */}
        <div
          ref={animatedBlockRef}
          className={`animated-fill ${isInView ? "active" : ""}`}
        ></div>
        <div className="flex w-10/12 mx-auto">
          <div className="flex flex-col px-1 mx-3">
            <img src={cardriving} alt="Car Driving" />
            <h4 className="font-semibold text-center mx-auto text-bgdark font-primary -mt-2">
              Certified Vehicles Only
            </h4>
          </div>
          <div className="flex flex-col px-1 mx-3">
            <img src={carwithplus} />
            <h4 className="font-semibold text-center mx-auto text-bgdark font-primary -mt-2">
              Certified Vehicles Only
            </h4>
          </div>
          <div className="flex flex-col px-1 mx-3">
            <img src={keys} />
            <h4 className="font-semibold text-center mx-auto text-bgdark font-primary -mt-2">
              Certified Vehicles Only
            </h4>
          </div>
          <div className="flex flex-col px-1 mx-3">
            <img src={truckdriving} />
            <h4 className="font-semibold text-center mx-auto text-bgdark font-primary -mt-2">
              Certified Vehicles Only
            </h4>
          </div>
          <div className="flex flex-col px-1 mx-3">
            <img src={speedometer} />
            <h4 className="font-semibold text-center mx-auto text-bgdark font-primary -mt-2">
              Certified Vehicles Only
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-primary text-center h-2/4 py-60 ">
        <p>
          Looking for Financing? We've Got You Covered: Explore our low APR
          financing options and get behind the wheel of your desired vehicle.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
