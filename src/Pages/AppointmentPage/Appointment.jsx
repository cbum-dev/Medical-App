// src/components/AppointmentPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentPage = () => {
  const handleAppointmentBooking = async (Data) => {
    try {
      // Perform the logic to book the appointment
      // Send a request to your backend API to handle the appointment booking
      const response = await axios.post(
        'http://localhost:8000/api/appointments/create/',Data,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      // Handle the response as needed
      console.log('Appointment booked successfully:', response.data);

      // Reset the form or perform any other necessary actions

    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleAppointmentBooking}>
        <div>
          <label>Problem:</label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
        <div>
          <label>Datetime:</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentPage;
