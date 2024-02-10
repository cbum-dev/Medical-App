import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed-bottom bg-dark text-white text-center py-2">
      <div className="container">
        <p>&copy; {currentYear} MedTalk. All rights reserved.</p>
      </div>
      <style>
        {`
          body {
            padding-bottom: 60px; /* Adjust the value to match the height of your footer */
             
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
