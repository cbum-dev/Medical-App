import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthcareProviderForm = () => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [fees, setFees] = useState(1200);
  const [about, setAbout] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [allSpecialities, setAllSpecialities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all specialities
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get('http://localhost:8000/speciality/');
        setAllSpecialities(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching specialities');
      }
    };

    fetchSpecialities();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data using a POST request
      await axios.post('http://localhost:8000/register/provider/', {
        name,
        experience,
        education,
        phone,
        address,
        fees,
        about,
        speciality: specialities.map(spec => spec.id),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      // Optionally, you can handle success, e.g., redirect to another page
    } catch (error) {
      setError(error.message || 'Error updating user data');
    }
  };

  const handleSpecialitiesChange = (selectedSpecialities) => {
    setSpecialities(selectedSpecialities);
  };

  return (
    <div className="container mt-5">
      <h2>Healthcare Provider Profile</h2>
      {error && <p className="text-danger">{error}</p>}
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
          <label htmlFor="experience">Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            className="form-control"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
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
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            className="form-control"
            id="fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
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
          <label htmlFor="specialities">Specialities</label>
          <select
            id="specialities"
            className="form-control"
            multiple
            value={specialities.map(spec => spec.id)}
            onChange={(e) => handleSpecialitiesChange(
              Array.from(e.target.selectedOptions, option => ({
                id: option.value,
                name: option.label,
              }))
            )}
            required
          >
            {allSpecialities.map(spec => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default HealthcareProviderForm;
