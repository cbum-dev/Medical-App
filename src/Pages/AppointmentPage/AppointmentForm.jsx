import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    datetime: '',
    problem: '',
  });
  const { providerId } = useParams();
  console.log(providerId)
  const getUserIdFromToken = () => {
    // Implement logic to extract user ID from the token
    // For example, decode the JWT token and get the user ID
    return 'user_id_from_token';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // Handle the case where the token is not available
        console.error('Authentication token not found');
        return;
      }

      // Use the getUserIdFromToken function to get the user ID
      const userId = getUserIdFromToken();

      // Make the POST request
      await axios.post(
        'http://localhost:8000/api/appointments/create/',
        {
          user: userId,
          appointment_datetime: formData.datetime,
          problem: formData.problem,
          healthcare_provider: providerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Appointment created successfully');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Datetime:
        <input
          type="date"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Problem:
        <input
          type="text"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AppointmentForm;
