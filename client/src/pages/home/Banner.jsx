import React from "react";
import bannerIMG from "../../assets/bannercar.jpg";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="w-full bg-bgdark">
      <div
        className="w-full h-[70vh] sm:h-[80vh] xl:h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-8"
        style={{ backgroundImage: `url(${bannerIMG})` }}
      >
        <div className="bg-black/50 p-6 sm:p-10 rounded-xl text-center max-w-4xl mx-auto">
          <h1 className="text-white text-3xl sm:text-5xl xl:text-6xl font-bold font-primary mb-4">
            Welcome to 828 AUTO LLC
          </h1>
          <p className="text-white text-base sm:text-lg xl:text-xl mb-6 font-primary">
            Find your dream car among our wide selection of vehicles.
          </p>
          <Link
            to="/allinventory"
            className="inline-block bg-primary hover:bg-primary/90 transition px-6 py-3 rounded-3xl text-secondary font-secondary text-sm sm:text-base"
          >
            View Inventory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
