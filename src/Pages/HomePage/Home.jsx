import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, path, description, imageSrc }) => (
  <div
    className="card m-3 bg-dark text-light"
    style={{ width: "100%", maxWidth: "400px" }}
  >
    <img src={imageSrc} className="card-img-top" alt={`${title} Image`} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <Link to={`/${path}`} className="btn btn-primary">
        Explore
      </Link>
    </div>
  </div>
);

const cardsData = [
  {
    title: "HealthCare Providers",
    path: "providers",
    description: "Connect with dedicated healthcare providers...",
    imageSrc: "./doctor.jpg",
  },
  {
    title: "Chat Room",
    path: "chat",
    description: "Join community chat for discussions and support...",
    imageSrc: "./chatroom.jpg",
  },
  {
    title: "Report",
    path: "record",
    description: "Secure Your reports easily...",
    imageSrc: "./report.jpg",
  },
  {
    title: "Help Center",
    path: "help",
    description: "Assistance and guidance from our help center...",
    imageSrc: "./help-center.jpg",
  },
  {
    title: "Blogs",
    path: "blog",
    description: "Read insightful blogs on various health topics...",
    imageSrc: "./blog.jpg",
  },
  {
    title: "Speciality",
    path: "speciality",
    description: "Providers Based on their field and speciality...",
    imageSrc: "./speciality.jpg",
  },
];
const Header = () => (
  <div className="text-center py-4">
    <h1 className="text-light display-3">MedTalk</h1>
    <p className="text-white lead">
      Your Health, Our Priority And A Solution For Everyone!
    </p>
  </div>
);

const Footer = () => (
  <footer className="bg-black w-100  flex  text-white py-5 rounded mt-5">
    <div className="container w-75 bg-">
      <div className="row">
        <div className="col-md-6">
          <h5>Contact Us</h5>Your Blogs
          <p>Phone: +91-8745-485-459</p>
          <p>Email: medtalk@med.com</p>
          <p>
            Website:{" "}
            <Link
              style={{ textDecoration: "None" }}
              to="https://medical-react-sepia.vercel.app/"
            >
              MedTalk
            </Link>
          </p>
        </div>
        <div className="col-md-6">
          <h5>Important Links</h5>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="row"></div>
    </div>
  </footer>
);
const Home = () => (
  <div className="container w-100">
    <Header />
    <div className="row">
      {cardsData.map((card, index) => (
        <div key={index} className="col-md-6">
          <Card {...card} />
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

export default Home;
