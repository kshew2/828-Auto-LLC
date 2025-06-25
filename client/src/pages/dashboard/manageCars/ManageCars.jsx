import React from 'react';
import { useDeleteCarMutation, useFetchAllCarsQuery } from '../../../redux/features/cars/carsApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageCars = () => {
    const navigate = useNavigate();
    const { data: carsData, error, isLoading, refetch } = useFetchAllCarsQuery();
    const [deleteCar] = useDeleteCarMutation();

    // Handle deleting a car
    const handleDeleteCar = async (id) => {
        try {
            await deleteCar(id).unwrap();
            alert('Car deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete car:', error.message);
            alert('Failed to delete car. Please try again.');
        }
    };

    // Handle navigating to Edit Car page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-car/${id}`);
    };

    // Extract cars array from carsData
    const cars = carsData?.cars || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading cars: {error.message}</div>;
    }

    return (
        <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">All Cars</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                        </div>
                    </div>
                </div>
    
                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    #
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Make
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Model
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Category
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Price
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                                cars && cars.map((car, index) => (
                                    <tr key={index}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                       {index + 1}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {car.make} 
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                       {car.model}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      {car.category}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
    
                                        ${car.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
    
                                        <Link to={`/dashboard/edit-car/${car._id}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                            Edit
                                        </Link>
                                        <button 
                                        onClick={() => handleDeleteCar(car._id)}
                                        className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2">Delete</button>
                                    </td>
                                </tr> 
                                ))
                            }
             
    
                        </tbody>
    
                    </table>
                </div>
            </div>
        </div>
    
    </section>
    );
};

export default ManageCars;