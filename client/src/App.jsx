import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useFetchAllCarsQuery } from "./redux/features/cars/carsApi";
import { AuthProvide } from "./context/AuthContext";

function App() {
  // Use the query hook to fetch data
  const { data, error, isLoading } = useFetchAllCarsQuery();

  if (isLoading) return (
  <div className="flex items-center justify-center min-h-screen bg-bgdark">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid mb-4"></div>
      <span className="text-xl text-primary font-semibold">Loading cars...</span>
    </div>
  </div>
);
  if (error) return <div>Error fetching cars: {error.message}</div>;

  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className="min-h-screen max-w-full mx-auto font-primary">
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
