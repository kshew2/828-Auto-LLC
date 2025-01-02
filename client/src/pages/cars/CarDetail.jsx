import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCarByIdQuery } from '../../redux/features/cars/carsApi';
import { getImgUrl } from '../../utils/getImgUrl';

const CarDetail = () => {
    const { id } = useParams();
    const { data: car, isLoading, isError } = useFetchCarByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error trying to load car info</div>;

    return (
        <div className="flex justify-center items-center p-10 min-h-screen bg-bgdark">
            <div className="max-w-2xl w-full">
                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-secondary font-primary sm:text-xl">
                        {car.year} {car.make} {car.model}
                    </h1>
                </div>

                {/* Main Content */}
                <div className="shadow-lg p-5 bg-secondary rounded-xl">
                    {/* Image */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={getImgUrl(car.coverImage)}
                            alt={car.make}
                            className="max-w-full rounded"
                        />
                    </div>

                    {/* Details and Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Details */}
                        <div>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Make:</strong> {car.make || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Model:</strong> {car.model || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Year:</strong> {car.year || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Color:</strong> {car.color || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Trim:</strong> {car.trim || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Mileage:</strong> {car.mileage || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Type:</strong> {car.type || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Engine:</strong> {car.engine || 'admin'}</p>
                            <p className="text-gray-700 mb-2 sm:text-base text-sm">
                                <strong>Year:</strong> {new Date(car?.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-2 sm:text-base text-sm capitalize">
                                <strong>Category:</strong> {car?.category}
                            </p>
                            <p className="text-gray-700 sm:text-base text-sm"><strong>Description:</strong> {car.model}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <strong className="text-gray-700 mb-2 block sm:text-base text-sm">Features:</strong>
                            {car.features && car.features.length > 0 ? (
                                <ul className="list-disc ml-4 space-y-1">
                                    {car.features.map((feature, index) => (
                                        <li key={index} className="text-gray-700 sm:text-base text-sm">
                                            {feature || 'No feature available'}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-700 sm:text-base text-sm">No features available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
