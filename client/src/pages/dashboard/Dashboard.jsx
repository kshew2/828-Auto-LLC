import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { FaCar, FaChartBar, FaTrophy } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [totalCarsSold, setTotalCarsSold] = useState(0);
    const [topCategory, setTopCategory] = useState('No Data');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from /api/cars...');
                const response = await axiosInstance.get('/api/cars');
                console.log('API Response:', response.data);

                // Access the cars array from the response object
                const cars = response.data.cars;

                // Check if cars data exists
                if (!cars || cars.length === 0) {
                    console.warn('No cars data found.');
                    setTotalCarsSold(0);
                    setTopCategory('No Data');
                    setLoading(false);
                    return;
                }

                // Filter cars with status "sold"
                const soldCars = cars.filter((car) => car.status === 'sold');
                console.log('Sold Cars:', soldCars);

                // Calculate total cars sold
                const totalSold = soldCars.length;
                setTotalCarsSold(totalSold);

                // Calculate top category among sold cars
                const categoryCount = soldCars.reduce((acc, car) => {
                    const category = car.category || 'Unknown';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});
                console.log('Category Count:', categoryCount);

                const topCategory = Object.keys(categoryCount).reduce(
                    (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
                    'No Data'
                );
                setTopCategory(topCategory);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTotalCarsSold(0);
                setTopCategory('Error');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Cars Sold */}
                <div className="flex items-center p-6 bg-blue-100 shadow rounded-lg">
                    <div className="inline-flex items-center justify-center h-12 w-12 text-blue-600 bg-blue-200 rounded-full mr-4">
                        <FaCar size={24} />
                    </div>
                    <div>
                        <span className="block text-xl font-bold">{totalCarsSold}</span>
                        <span className="block text-gray-600">Total Cars Sold</span>
                    </div>
                </div>

                {/* Top Category */}
                <div className="flex items-center p-6 bg-green-100 shadow rounded-lg">
                    <div className="inline-flex items-center justify-center h-12 w-12 text-green-600 bg-green-200 rounded-full mr-4">
                        <FaTrophy size={24} />
                    </div>
                    <div>
                        <span className="block text-xl font-bold">{topCategory}</span>
                        <span className="block text-gray-600">Top Category</span>
                    </div>
                </div>

                {/* Placeholder Card */}
                <div className="flex items-center p-6 bg-yellow-100 shadow rounded-lg">
                    <div className="inline-flex items-center justify-center h-12 w-12 text-yellow-600 bg-yellow-200 rounded-full mr-4">
                        <FaChartBar size={24} />
                    </div>
                    <div>
                        <span className="block text-xl font-bold">New Metric</span>
                        <span className="block text-gray-600">Custom Data</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;