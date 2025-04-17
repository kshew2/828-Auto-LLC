import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCarByIdQuery } from '../../redux/features/cars/carsApi';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CarDetail = () => {
    const { id } = useParams();
    const { data: car, isLoading, isError } = useFetchCarByIdQuery(id);
    const carouselRef = useRef(null);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error trying to load car info</div>;

    const items = car.media && car.media.length > 0
        ? car.media.map((media, index) => {
            const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg');
            return (
                <div
                    key={index}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                    {isVideo ? (
                        <video
                            controls
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                            className="rounded"
                        >
                            <source src={media} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={media}
                            alt={`${car.make} ${car.model}`}
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                            className="rounded"
                        />
                    )}
                </div>
            );
        })
        : [];

    return (
        <div className="flex justify-center items-center p-10 min-h-screen bg-bgdark">
            <div className="max-w-2xl w-full">
                {/* Title */}
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-secondary font-primary sm:text-xl">
                        {car.year} {car.make} {car.model}
                    </h1>
                </div>

                {/* Main Content */}
                <div className="shadow-lg p-5 bg-secondary rounded-xl">
                    {/* Carousel */}
                    <div className="mb-4">
                        {items.length > 0 ? (
                            <AliceCarousel
                                ref={carouselRef}
                                items={items}
                                autoPlay
                                autoPlayInterval={3000}
                                infinite
                                disableDotsControls={true}
                                disableButtonsControls={true}
                            />
                        ) : (
                            <p>No media available</p>
                        )}
                    </div>

                    {/* Custom arrows under carousel */}
                    {items.length > 1 && (
                        <div className="flex justify-center items-center gap-6 mb-4">
                            <button
                                onClick={() => carouselRef.current?.slidePrev()}
                                className="text-3xl font-bold text-gray-700 hover:text-primary transition"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => carouselRef.current?.slideNext()}
                                className="text-3xl font-bold text-gray-700 hover:text-primary transition"
                            >
                                ›
                            </button>
                        </div>
                    )}

                    {/* Horizontal Line */}
                    <hr className="border-gray-300 mb-4" />

                    {/* Details and Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Details */}
                        <div>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Make:</strong> {car.make || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Model:</strong> {car.model || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Year:</strong> {car.year || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Color:</strong> {car.color || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Trim:</strong> {car.trim || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Mileage:</strong> {car.mileage || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Type/Category:</strong> {car.category || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-base"><strong>Engine:</strong> {car.engine || 'admin'}</p>
                            <p className="text-gray-700 mb-2 sm:text-base text-base">
                                <strong>Posted:</strong> {new Date(car?.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 sm:text-base text-base"><strong>Description:</strong> {car.model}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <strong className="text-gray-700 mb-2 block sm:text-base text-base">Features:</strong>
                            {car.features && car.features.length > 0 ? (
                                <ul className="list-disc ml-4 space-y-1">
                                    {car.features.map((feature, index) => (
                                        <li key={index} className="text-gray-700 sm:text-base text-base">
                                            {feature || 'No feature available'}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-700 sm:text-base text-base">No features available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
