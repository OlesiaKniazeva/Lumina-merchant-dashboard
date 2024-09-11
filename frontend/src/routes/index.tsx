import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<HomePage />}
      errorElement={<ErrorPage />}
    ></Route>,
  ),
);

export default AppRouter;
