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
import ProfilePage from "./pages/ProfilePage";
import ApplicationReviewPage from "./pages/ApplicationReviewPage";
import DashboardTradiePage from "./pages/DashboardTradiePage";
import PostJobAdPage from "./pages/PostJobAdPage";
import DashboardAdminPage from "./pages/DashboardAdminPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import TradieJobAdsPage from "./pages/TradieJobAdsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ForgotPassword from "./pages/ForgotPassword";

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
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/profile/:id/edit" element={<ProfileEditPage />} />
      <Route
        path="/login/application-under-review"
        element={<ApplicationReviewPage />}
      />
      <Route
        path="/tradesperson/dashboard/:id"
        element={<DashboardTradiePage />}
      />
      <Route path="/tradesperson/post-job-ad" element={<PostJobAdPage />} />
      <Route
        path="/tradie/profile/:id/job-ad/:serviceId"
        element={<PostJobAdPage />}
      />
      <Route path="/admin" element={<DashboardAdminPage />} />
      <Route
        path="/admin/application-details/:id"
        element={<ApplicationDetailsPage />}
      />
      <Route path="/profile/:id/:jobAds" element={<TradieJobAdsPage />} />
      <Route path="/change-password/:id" element={<ChangePasswordPage />} />
      <Route
        path="/terms-and-conditions/:role"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
