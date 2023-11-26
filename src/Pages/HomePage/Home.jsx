import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [speciality, SetSpeciality] = useState([]);
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8000/check/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setUserRole(response.data.role); // Assuming your API returns the user's role
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    checkUserRole();
  }, []);
  useEffect(() => {
    const Speciality = async () => {
      try {
        const response = await axios.get("http://localhost:8000/speciality/");
        setUserRole(response.data.role); // Assuming your API returns the user's role
      } catch (error) {
        console.error("Error with speciality:", error);
      }
    };

    Speciality();
  }, []);

  return (
    <>
      {" "}
      <div>
        {userRole === "healthcare_provider" && (
          <div>
            <h2>Welcome Healthcare Provider!</h2>
            {/* Render healthcare provider features here */}
          </div>
        )}
        {userRole === "normal_user" && (
          <div>
            <h2>Welcome Normal User!</h2>
            {/* Render normal user features here */}
          </div>
        )}
        {userRole === null && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Home;
