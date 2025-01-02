import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCarByIdQuery } from '../../redux/features/cars/carsApi';
import { getImgUrl } from '../../utils/getImgUrl';

const CarDetail = () => {
    const { id } = useParams();
    const { data: car, isLoading, isError } = useFetchCarByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error trying to load car info</div>;

    return (
        <div className="flex justify-center p-10 items-center min-h-screen bg-bgdark"> {/* Use flex to center content */}
            <div className="max-w-xl ">
                <div className=''>
                <h1 className="text-2xl font-bold mb-6 text-secondary font-primary">{car.year} {car.make} {car.model}</h1>
                </div>
                <div className='mx-auto shadow-lg p-5 mb-8 bg-secondary rounded-xl'>
                    <div>
                        <img
                            src={`${getImgUrl(car.coverImage)}`}
                            alt={car.make}
                            className="mb-8"
                        />
                    </div>

                    <div className='mb-5'>
                        <p className="text-gray-700 mb-2"><strong>Make:</strong> {car.make || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Model:</strong> {car.model || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Year:</strong> {car.year || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Color:</strong> {car.color || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Trim:</strong> {car.color || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Mileage:</strong> {car.color || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Color:</strong> {car.color || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Type:</strong> {car.type || 'admin'}</p>
                        <p className="text-gray-700 mb-2"><strong>Engine:</strong> {car.engine || 'admin'}</p>

                        {/* Features */}
                        {car.features && car.features.length > 0 ? (
                            <div className="mb-4">
                                <strong className="text-gray-700 mb-2">Features:</strong>
                                <ul className='mx-10'>
                                    {car.features.map((feature, index) => (
                                        <li key={index} className="text-gray-700 mb-2 list-disc">
                                            {feature || 'No feature available'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-700 mb-2">No features available</p>
                        )}

                        <p className="text-gray-700 mb-4">
                            <strong>Year:</strong> {new Date(car?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4 capitalize">
                            <strong>Category:</strong> {car?.category}
                        </p>
                        <p className="text-gray-700"><strong>Description:</strong> {car.model}</p>
                    </div>

                    {/* <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                        <FiShoppingCart className="" />
                        <span>Add to Cart</span>
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default CarDetail;
