import React, { useState, useEffect } from "react";
import axios from "axios";
import HealthcareProviderCard from "./HealthcareProviderCard";

const HealthcareProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/providers/"
        );
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching healthcare providers:", error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="display-6 text-white my-3">All Healthcare Providers</h2>
      <div className="w-100 card-container">
        {providers.map((provider) => (
          <HealthcareProviderCard key={provider.user} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default HealthcareProviders;
