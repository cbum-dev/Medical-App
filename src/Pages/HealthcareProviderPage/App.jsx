// src/components/HealthcareProviders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthcareProviderCard from './HealthcareProviderCard';

const HealthcareProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/providers/');
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching healthcare providers:', error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div>
      <h2 style={{padding:'10px'}}>All Healthcare Providers</h2>
      <div className="card-container">
        {providers.map(provider => (
          <HealthcareProviderCard key={provider.user} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default HealthcareProviders;
