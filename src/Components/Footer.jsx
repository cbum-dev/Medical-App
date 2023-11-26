// Footer.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './style.css'; // Import your custom styles

const Footer = () => {
  return (
    <footer style={{backgroundColor : '#0a0f3d'}} className="sticky-sm-bottom  text-white text-center py-2 ">
      <div className="container">
        <p>&copy; 2023 MedTalk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
