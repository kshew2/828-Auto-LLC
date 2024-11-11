
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar />

    <main className='min-h-screen max-w-full mx-auto font-primary'>
      <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
