import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    problem: "",
  });

  const { providerId } = useParams();
  const navigate = useNavigate();

  const getUserIdFromToken = () => "user_id_from_token";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const userId = getUserIdFromToken();

      await axios.post(
        "https://medi-dep-bykw.vercel.app/api/appointments/create/",
        {
          user: userId,
          appointment_datetime: `${formData.date}T${formData.time}`,
          problem: formData.problem,
          healthcare_provider: providerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment created successfully");

      navigate("/book");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Error! Try Again. ");
      navigate("/providers");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-3">
        <label className="form-label">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Problem:</label>
        <input
          type="text"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
