import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AllSpeciality = () => {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/speciality/");
        setSpecialities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching specialities:", error);
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Healthcare Providers by Speciality</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 overflow-auto">
          {specialities.map((speciality) => (
            <div key={speciality.id} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" ><Link to= {`/all/${speciality.id}`}>{speciality.name.toUpperCase()}</Link></h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSpeciality;
