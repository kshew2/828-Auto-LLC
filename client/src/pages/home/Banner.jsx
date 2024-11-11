import React from 'react';
import bannerIMG from "../../assets/bannercar.jpg";
import { Link } from 'react-router-dom';


export const Banner = () => {
  return (
    <div className='max-h-lvh bg-bgdark'>
    <div className='flex h-full w-full bg-cover bg-no-repeat bg-center py-16' style={{backgroundImage: `url(${bannerIMG})`}}>
      <div className='flex xl:h-2/3 lg:h-1/2 md:h-1/3 h-48 md:w-8/12 w-10/12 mx-auto flex-col items-center justify-center relative text-center'> {/* Changed here */}
        <h1 className='xl:text-9xl lg:text-7xl md:text-7xl text-5xl xl:mb-6 mb-2 font-semibold text-white font-primary'>
          Welcome to 828 AUTO LLC
        </h1>
        <p className='text-white md:w-8/12 w-8/12 xl:mb-6 mb-2 font-primary md:text-xl text-base '>
          FIND YOUR DREAM CAR AMONG OUR WIDE SELECTION OF VEHICLES
        </p>
        {/* <a href='/allinventory'>All Inventory</a> */}
        <Link to="/allinventory" className='btn bg-primary  px-4 py-2 rounded-3xl text-secondary font-secondary font-extralight'>All Inventory</Link>
        {/* <button className='btn bg-primary  px-4 py-2 rounded-3xl text-secondary font-secondary font-extralight'>Contact</button> */}
      </div>
    </div>
    </div>
  );
};

export default React.memo(Banner);
