// ProviderProfile.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullProfile from "./ProfilePage";
const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const { providerId } = useParams();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/providers/${providerId}/`
        );
        setProvider(response.data);
      } catch (error) {
        console.error("Error fetching provider:", error);
      }
    };

    fetchProvider();
  }, [providerId]);

  // Check if provider is available
  if (!provider) {
    return <p>Loading...</p>;
  }

  // const name = provider.name[0].toUpperCase() + provider.name.substring(1);

  return (

    <div>
      <div className="card-container">
        {provider.map(provider => (
          <FullProfile key={provider.user} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProviderProfile;
