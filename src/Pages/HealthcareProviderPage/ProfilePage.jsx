// src/components/HealthcareProviderCard.js
import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const FullProfile = ({ provider }) => {
  const uppercasedName = provider.name.toUpperCase();

  return (
    <Card
      className="card bg-tertiary"
      style={{ width: "100%", marginBottom: "20px" }}
    >
      <Card.Title
        className="card-header"
        style={{ backgroundColor: "#cacee8" }}
      >
        Dr. {uppercasedName}
      </Card.Title>
      <Card.Body style={{ padding: "10px" }}>
        <Card.Text>Address: {provider.address}</Card.Text>
        <Card.Text>Phone: {provider.phone}</Card.Text>
        <Card.Text>
          Experience: {provider.experience} Years of Experience
        </Card.Text>
        <Card.Text>Fees: {provider.fees}</Card.Text>
        <Card.Text>About: {provider.about}</Card.Text>
        <Card.Text>Reg.No: {provider.user.id}</Card.Text>
        <div>
          <h4>Specialities:</h4>
          <ul>
            {provider.speciality.map((speciality, index) => (
              <li key={index}>{speciality}</li>
            ))}
          </ul>
        </div>
      </Card.Body>

      <Link
        to={`/books/${provider.user}`}
        className="btn btn-success  border-white"
      >
        Book Appointment
      </Link>
    </Card>
  );
};

export default FullProfile;
