import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const FullProfile = ({ provider }) => {
  const uppercasedName = provider.name.toUpperCase();

  return (
    <Card
      className="bg-light mt-3"
      style={{ width: "100%", marginBottom: "20px" }}
    >
      <Card.Header
        className="text-center"
        style={{ backgroundColor: "#cacee8" }}
      >
        <h3>Dr. {uppercasedName}</h3>
      </Card.Header>
      <Card.Body style={{ padding: "20px" }}>
        <Card.Text>
          <strong>Address:</strong> {provider.address}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {provider.phone}
        </Card.Text>
        <Card.Text>
          <strong>Experience:</strong> {provider.experience} Years of Experience
        </Card.Text>
        <Card.Text>
          <strong>Fees:</strong> {provider.fees}
        </Card.Text>
        <Card.Text>
          <strong>About:</strong> {provider.about}
        </Card.Text>
        <Card.Text>
          <strong>Reg.No:</strong> {provider.user.id}
        </Card.Text>
        <div>
          <h4>
            <strong>Specialities:</strong>
          </h4>
          <ul>
            {provider.speciality.map((speciality, index) => (
              <li key={index}>{speciality}</li>
            ))}
          </ul>
        </div>
      </Card.Body>

      <Link
        to={`/books/${provider.user}`}
        className="btn btn-success btn-block"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        Book Appointment
      </Link>
    </Card>
  );
};

export default FullProfile;
