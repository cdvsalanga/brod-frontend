import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpInfoPage from "./pages/SignUpInfoPage";
import ServicesPage from "./pages/ServicesPage";
import SearchPage from "./pages/SearchPage";
import JobAdPage from "./pages/JobAdPage";
import FavoritesPage from "./pages/FavoritesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/:id" element={<SignUpInfoPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/search" element={<SearchPage />} />
      <Route path="/job-ad/:id" element={<JobAdPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
