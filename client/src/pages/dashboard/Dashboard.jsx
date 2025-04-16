import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import Loading from '../../components/Loading';
import { FaCar, FaChartBar, FaTrophy } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [totalCarsSold, setTotalCarsSold] = useState(0);
  const [topCategory, setTopCategory] = useState('No Data');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
        setAuthLoading(false);
      } else {
        navigate('/admin-login');
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/cars');
      const cars = response.data.cars || [];
      const soldCars = cars.filter((car) => car.status === 'sold');
      setTotalCarsSold(soldCars.length);

      const categoryCount = soldCars.reduce((acc, car) => {
        const category = car.category || 'Unknown';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      const topCategory = Object.keys(categoryCount).reduce(
        (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
        'No Data'
      );
      setTopCategory(topCategory);
      setLoading(false);
    } catch (error) {
      setTotalCarsSold(0);
      setTopCategory('Error');
      setLoading(false);
    }
  };

  if (authLoading || loading) return <Loading />;

  return (
    <div className="p-4">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-6 bg-blue-100 shadow rounded-lg">
          <div className="inline-flex items-center justify-center h-12 w-12 text-blue-600 bg-blue-200 rounded-full mr-4">
            <FaCar size={24} />
          </div>
          <div>
            <span className="block text-xl font-bold">{totalCarsSold}</span>
            <span className="block text-gray-600">Total Cars Sold</span>
          </div>
        </div>
        <div className="flex items-center p-6 bg-green-100 shadow rounded-lg">
          <div className="inline-flex items-center justify-center h-12 w-12 text-green-600 bg-green-200 rounded-full mr-4">
            <FaTrophy size={24} />
          </div>
          <div>
            <span className="block text-xl font-bold">{topCategory}</span>
            <span className="block text-gray-600">Top Category</span>
          </div>
        </div>
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