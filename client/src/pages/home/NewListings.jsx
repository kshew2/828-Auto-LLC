import React, { useEffect, useState } from 'react';
import CarCard from '../cars/CarCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Swiper's navigation CSS
import 'swiper/css/pagination'; // Import Swiper's pagination CSS

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const NewListings = () => {
    const [cars, setCars] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    useEffect(() => {
        fetch("cars.json")
            .then(res => res.json())
            .then((data) => setCars(data));
    }, []);

    const filteredCars = selectedCategory === "Choose a genre" ? cars : cars.filter(car => car.category === selectedCategory.toLowerCase());

    return (
        <div className='py-10 bg-bgdark px-5'>
            <h2 className='text-3xl font-semibold mb-6 text-secondary font-primary'>New Listings</h2>
            
            {/* Category Filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            {/* Swiper Slider */}
            <Swiper
                spaceBetween={20} // Space between slides
                slidesPerView={1} // Show one slide at a time
                breakpoints={{
                    640: {
                        slidesPerView: 2, // 2 slides on small screens
                    },
                    768: {
                        slidesPerView: 3, // 3 slides on medium screens
                    },
                    1024: {
                        slidesPerView: 4, // 4 slides on large screens
                    },
                }}
                navigation={{ clickable: true }} // Enable navigation
                pagination={{ clickable: true }} // Enable pagination
                className="mySwiper relative z-50"
            >
                {filteredCars.map((car, index) => (
                    <SwiperSlide key={index}>
                        <CarCard car={car} />
                    </SwiperSlide>
                ))}
                
                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-white z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full shadow-md hover:bg-secondary">
                    &lt;
                </div>
                <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-white z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full shadow-md hover:bg-secondary">
                    &gt;
                </div>
            </Swiper>
        </div>
    );
};

export default NewListings;
