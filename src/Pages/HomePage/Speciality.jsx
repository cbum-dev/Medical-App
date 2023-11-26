import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { specialityId } = useParams();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/providers/speciality/${specialityId}/ `
        );
        setProviders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div>
      <h2>Healthcare Providers by Speciality</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-deck">
          {providers.map((provider) => (
            <div key={provider.user.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{provider.name}</h5>
                <p className="card-text">Experience: {provider.experience}</p>
                <p className="card-text">Education: {provider.education}</p>
                {/* Add more fields as needed */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
