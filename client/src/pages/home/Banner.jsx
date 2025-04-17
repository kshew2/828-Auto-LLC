import React from "react";
import bannerIMG from "../../assets/bannercar.jpg";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="bg-bgdark">
      <div
        className="flex h-[60vh] md:h-[70vh] xl:h-[75vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerIMG})` }}
      >
        <div className="flex flex-col items-center justify-center w-10/12 md:w-8/12 mx-auto text-center text-white space-y-4">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-semibold font-primary">
            Welcome to 828 AUTO LLC
          </h1>
          <p className="text-sm md:text-lg xl:text-xl font-primary">
            FIND YOUR DREAM CAR AMONG OUR WIDE SELECTION OF VEHICLES
          </p>
          <Link
            to="/allinventory"
            className="btn bg-primary px-6 py-3 rounded-3xl text-secondary font-secondary font-light"
          >
            All Inventory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
