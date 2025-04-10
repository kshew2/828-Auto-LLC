import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCarByIdQuery } from '../../redux/features/cars/carsApi';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CarDetail = () => {
    const { id } = useParams();
    const { data: car, isLoading, isError } = useFetchCarByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error trying to load car info</div>;

    const items = car.media && car.media.length > 0 ? car.media.map((media, index) => {
        const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg');
        return (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', margin: '0rem' }}>
                {isVideo ? (
                    <video controls style={{ maxHeight: '100%', maxWidth: '100%' }} className="rounded">
                        <source src={media} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={media}
                        alt={`${car.make} ${car.model}`}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        className="rounded"
                    />
                )}
            </div>
        );
    }) : [];

    return (
        <div className="flex justify-center items-center p-10 min-h-screen bg-bgdark">
            <style>
{`
.custom-nav-btn {
    font-size: 2rem; /* Increase the font size for larger buttons */
    padding: 1px;
    margin: 0;
    // background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    // color: white; /* White text color */
    // border: none; /* Remove border */
    // border-radius: 50%; /* Make the buttons circular */
    // width: 40px; /* Set a fixed width */
    // height: 40px; /* Set a fixed height */
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // cursor: pointer; /* Change cursor to pointer */
    // position: absolute; /* Position the buttons absolutely */
    // top: 100%; /* Center vertically */
    // padding: 10px;
    // transform: translateY(-50%); /* Adjust for centering */
    // z-index: 10; /* Ensure buttons are above other elements */
}

// .alice-carousel__prev-btn {
//     left: 10px; /* Position the previous button to the left */
//     padding-top: 10px;
// }

// .alice-carousel__next-btn {
//     right: 10px; /* Position the next button to the right */
//     margin-top: 10px;
//     padding-top: 10px;
// }
`}
</style>
            <div className="max-w-2xl w-full">
                {/* Title */}
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-secondary font-primary sm:text-xl">
                        {car.year} {car.make} {car.model}
                    </h1>
                </div>

                {/* Main Content */}
                <div className="shadow-lg p-5 bg-secondary rounded-xl">
                    {/* Images */}
                    <div className="flex justify-center m-0">
                        {items.length > 0 ? (
                            <AliceCarousel
                                items={items}
                                autoPlay
                                autoPlayInterval={3000}
                                infinite
                                disableDotsControls
                                renderPrevButton={() => <button className="alice-carousel__prev-btn custom-nav-btn">‹</button>}
                                renderNextButton={() => <button className="alice-carousel__next-btn custom-nav-btn">›</button>}
                            />
                        ) : (
                            <p>No media available</p>
                        )}
                    </div>
                        <hr className='mb-2 text-lg font-black'></hr>
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
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Type/Category:</strong> {car.category || 'admin'}</p>
                            <p className="text-gray-700 mb-1 sm:text-base text-sm"><strong>Engine:</strong> {car.engine || 'admin'}</p>
                            <p className="text-gray-700 mb-2 sm:text-base text-sm">
                                <strong>Year:</strong> {new Date(car?.createdAt).toLocaleDateString()}
                            </p>
                            {/* <p className="text-gray-700 mb-2 sm:text-base text-sm capitalize">
                                <strong>Category:</strong> {car?.category}
                            </p> */}
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