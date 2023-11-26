import React, { useState } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data using a POST request
      await axios.post('http://localhost:8000/register/user/basic/', {
        name,
        about,
        phone,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      window.location.href = "//"
      // Optionally, you can handle success, e.g., redirect to another page
    } catch (error) {
      setError(error.message || 'Error updating user data');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fill This Form For Furthur Actions.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            className="form-control"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
