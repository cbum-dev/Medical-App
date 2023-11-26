import React from "react";
import Footer from "./Components/Footer";
import {CustomNavbar} from "./Components/Navbar";
import { Login } from "./Components/login";
import Logout from "./Components/Logout";
import Blog from "./Pages/BlogPage/Blog";
import Home from "./Pages/HomePage/Speciality";
import HealthcareProviders from "./Pages/HealthcareProviderPage/App";
import BlogPage from "./Pages/BlogPage/BlogPages";
import HomePage from "./Pages/HomePage/Home";
// import RecordView from "./Pages/RecordsPage/Record";
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
const Final = () => {
  return (
    <div>
      <BrowserRouter>
        <CustomNavbar />
        {/* <useUserRole/> */}
        <Routes>
          <Route path='/profile/:providerId' element={<ProviderProfile/>}/>
          <Route path="/register/user/basic" element={<UserProfileForm/>} />
          <Route path="/register/user/provider" element={<HealthcareProviderForm/>} />
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/providers" element={<HealthcareProviders />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<FullBlog />} />
          <Route path="/blog/del/:blogId" element={<BlogDeletePage />} />
          <Route path="/blog/update/:blogId" element={<BlogUpdatePage />} />
          <Route path="/createblog" element={<BlogPage/>} />
          <Route path="/book" element={<MyAppointments/>} />
          <Route path="all/:specialityId" element={<Home/>} />
          <Route path="/about" element={<AllSpeciality/>} />
          

          <Route path="/home" element={<HomePage/>} />
          <Route path="/record" element={<HealthcareProviderDetails/>} />
          {/* <Route path="/books/:providerId" element={<AppointmentPage/>} /> */}
          <Route path="/books/:providerId" element={<AppointmentForm/>} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Final;


