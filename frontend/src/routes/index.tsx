import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import ErrorPage from '@pages/ErrorPage';
import AdvertisementPage from '@pages/AdvertisementDetails/AdvertisementPage';
import OrdersPage from '@pages/Orders/OrdersPage';
import OrdersPage from '../pages/OrdersPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Navigate to="/advertisements" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/advertisements',
    element: <HomePage />,
  },
  {
    path: '/advertisements/:id',
    element: <AdvertisementPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
]);

export default AppRouter;
