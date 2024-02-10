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
          `https://medi-dep-bykw.vercel.app/providers/${providerId}/`
        );
        setProvider(response.data);
      } catch (error) {
        console.error("Error fetching provider:", error);
      }
    };

    fetchProvider();
  }, [providerId]);

  if (!provider) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-center my-3 text-white display-6">Provider Profile</h1>
      <div className="card-container mx-2">
        {provider.map((provider) => (
          <FullProfile key={provider.user} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProviderProfile;
