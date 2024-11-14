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

            <div>
            {filteredCars.map((car, index) => (
                        <CarCard car={car}  key={index}/>
                ))}
            </div>
        </div>
    );
};

export default NewListings;
