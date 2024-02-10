import React, { useState } from "react";
import axios from "axios";

const UserProfileForm = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://medi-dep-bykw.vercel.app/register/user/basic/",
        {
          name,
          about,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating user data");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Fill This Form For Furthur Actions.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mb-2"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            className="form-control mb-2"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
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
          Complete Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
