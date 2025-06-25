import React from 'react';

const AboutUs = () => {
  return (
    <div className="py-10 bg-bgdark px-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto mb-0">
        {/* Mobile heading (hidden on md and above) */}
        <h2 className="text-3xl font-semibold mb-4 text-secondary font-primary text-start md:hidden">
          About 828 Auto LLC
        </h2>

        <div className="flex flex-col md:flex-row items-start mb-2">
          {/* Image remains on the left for large screens */}
          <img
            src="/828_About_Image.jpg"
            alt="About Us"
            className="rounded-lg w-full md:w-1/2 h-auto mb-4 md:mb-0 md:mr-6 max-w-lg"
          />
          
          <div className="md:w-1/2">
            {/* Desktop heading (hidden on small screens) */}
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary font-primary text-start hidden md:block">
              About 828 Auto LLC
            </h2>
            <p className="text-xl sm:text-2xl sm:mb-24 text-secondary mb-4 font-medium text-left leading-relaxed">
              Welcome to 828 Auto LLC! We are dedicated to providing you with the best car buying experience. Our team is passionate about cars and committed to helping you find the perfect vehicle.
            </p>
            <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary font-primary text-start">
              Our Mission
            </h3>
            <p className="text-xl sm:text-2xl text-secondary font-medium text-left mb-0 leading-relaxed">
              Our mission is to offer high-quality vehicles at competitive prices while ensuring exceptional customer service. We strive to make the car buying process as smooth and enjoyable as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
