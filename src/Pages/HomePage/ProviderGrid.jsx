import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllSpeciality = () => {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/speciality/"
        );
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
    <div className="container ">
      <h2 className="text-white text-center my-3 display-6">Healthcare Providers by Speciality</h2>
      {loading ? (
        <p className="bg-secondary">Loading...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {specialities.map((speciality) => (
            <div key={speciality.id} className="col mb-4">
              <div className="card h-100 bg-black text-secondary border-3 border-secondary rounded-3">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title mb-3">
                    <Link
                      to={`/all/${speciality.id}`}
                      className="text-decoration-none"
                    >
                      {speciality.name.toUpperCase()}
                    </Link>
                  </h5>
                  <p className="card-text">{speciality.desc}</p>
                  <Link
                    to={`/all/${speciality.id}`}
                    className="btn btn-primary"
                  >
                    Explore Providers
                  </Link>
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
