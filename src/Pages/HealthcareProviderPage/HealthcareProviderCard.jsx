// src/components/HealthcareProviderCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const HealthcareProviderCard = ({ provider }) => {
  const uppercasedName = provider.name.toUpperCase();

  return (
    <Card className='card bg-tertiary' style={{ width: '100%', marginBottom: '20px' }}>
      <Card.Title className='card-header' style={{ backgroundColor: '#cacee8' }}>
        Dr. {uppercasedName}
      </Card.Title>
      <Card.Body style={{ padding: '10px' }}>
        <Card.Text>Address: {provider.address}</Card.Text>
        <Card.Text>Phone: {provider.phone}</Card.Text>
        <Card.Text>Experience: {provider.experience} Years of Experience</Card.Text>
        <Card.Text>Fees: {provider.fees}</Card.Text>
      </Card.Body>

      <div className="row" style={{ width: '100%', marginBottom: '20px' }}>
        <Link to={`/books/${provider.user}`} className="btn btn-success col-6 border-white">
          Book Appointment
        </Link>
        <Link to={`/profile/${provider.user}`} className="btn btn-danger col-6 border-white">
          See Full Profile
        </Link>
      </div>
    </Card>
  );
};

export default HealthcareProviderCard;
