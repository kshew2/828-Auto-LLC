import { Provider } from 'react-redux';  // Import Provider from react-redux
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import { store } from './redux/store';  // Import the store from the redux folder

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap your app with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
