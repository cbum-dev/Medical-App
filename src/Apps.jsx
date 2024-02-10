import React from "react";
import Footer from "./Components/Footer";
import { CustomNavbar } from "./Components/Navbar";
import { Login } from "./Components/login";
import Logout from "./Components/Logout";
import Blog from "./Pages/BlogPage/Blog";
import Home from "./Pages/HomePage/Speciality";
import HealthcareProviders from "./Pages/HealthcareProviderPage/App";
import BlogPage from "./Pages/BlogPage/BlogPages";
import HomePage from "./Pages/HomePage/Home";
import HealthcareProviderDetails from "./Pages/RecordsPage/Record";
import FullBlog from "./Pages/BlogPage/FullBlogPage";
import BlogDeletePage from "./Pages/BlogPage/BlogDelPage";
import BlogUpdatePage from "./Pages/BlogPage/BlogUpdatePage";
import ProviderProfile from "./Pages/HealthcareProviderPage/ProviderProfile";
import AppointmentForm from "./Pages/AppointmentPage/AppointmentForm";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // import BlogCard from './BlogCard';
import MyAppointments from "./Pages/AppointmentPage/MyAppointment";
import RegistrationForm from "./Components/Registration";
import UserProfileForm from "./Components/BasicDetails";
import HealthcareProviderForm from "./Components/HealthcareRegister";
import AllSpeciality from "./Pages/HomePage/ProviderGrid";
import HelpCenter from "./Pages/HelpCenter/HelpCenterView";
import HelpCenterComment from "./Pages/HelpCenter/HelpCenterComments";
import ChatRoomList from "./Pages/ChatRoom/ChatRoomList";
import MessageDetail from "./Pages/ChatRoom/Chat";
import Appointments from "./Pages/AppointmentPage/ProviderAppointment";
import AllAppointments from "./Pages/AppointmentPage/ProviderAllAppointment";
import CreateHealthRecord from "./Pages/RecordsPage/CreateReport";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // Check if there is an access token in local storage
  const accessToken = localStorage.getItem("access_token");

  // Return true if there is an access token, false otherwise
  return !!accessToken;
};
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const Final = () => {
  return (
    <div>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route
            path="/profile/:providerId"
            element={<PrivateRoute element={<ProviderProfile />} />}
          />
          <Route
            path="/register/user/basic"
            element={<PrivateRoute element={<UserProfileForm />} />}
          />
          <Route
            path="/register/user/provider"
            element={<PrivateRoute element={<HealthcareProviderForm />} />}
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={<PrivateRoute element={<Logout />} />}
          />
          <Route path="/providers" element={<HealthcareProviders />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog/:blogId"
            element={<PrivateRoute element={<FullBlog />} />}
          />
          <Route
            path="/blog/del/:blogId"
            element={<PrivateRoute element={<BlogDeletePage />} />}
          />
          <Route
            path="/blog/update/:blogId"
            element={<PrivateRoute element={<BlogUpdatePage />} />}
          />
          <Route
            path="/createblog"
            element={<PrivateRoute element={<BlogPage />} />}
          />
          <Route
            path="/book"
            element={<PrivateRoute element={<MyAppointments />} />}
          />
          <Route
            path="/book/provider"
            element={<PrivateRoute element={<Appointments />} />}
          />
          <Route
            path="/book/provider/all"
            element={<PrivateRoute element={<AllAppointments />} />}
          />
          <Route path="all/:specialityId" element={<Home />} />
          <Route path="/speciality" element={<AllSpeciality />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route
            path="/comment/:helpCenterId"
            element={<PrivateRoute element={<HelpCenterComment />} />}
          />
          <Route
            path="/chat"
            element={<PrivateRoute element={<ChatRoomList />} />}
          />
          <Route
            path="/room/:chatroomId"
            element={<PrivateRoute element={<MessageDetail />} />}
          />
          <Route
            path="/record/:appointmentId"
            element={<PrivateRoute element={<CreateHealthRecord />} />}
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/record"
            element={<PrivateRoute element={<HealthcareProviderDetails />} />}
          />
          <Route
            path="/books/:providerId"
            element={<PrivateRoute element={<AppointmentForm />} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Final;
