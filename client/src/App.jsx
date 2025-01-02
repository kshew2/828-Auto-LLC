
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useFetchAllCarsQuery } from './redux/features/cars/carsApi';


function App() {
  // Use the query hook to fetch data
  const { data, error, isLoading } = useFetchAllCarsQuery();

  if (isLoading) return <div>Loading cars...</div>;
  if (error) return <div>Error fetching cars: {error.message}</div>;

  return (
    <>
    <Navbar />

    <main className='min-h-screen max-w-full mx-auto font-primary'>
      <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
