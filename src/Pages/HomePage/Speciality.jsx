import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Home = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { specialityId } = useParams();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `https://medi-dep-bykw.vercel.app/providers/speciality/${specialityId}/ `
        );
        setProviders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div>
      <h2  className="text-white text-center my-3 display-6">Healthcare Providers by Speciality</h2>
      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : (
        <div className="card-deck">
          {providers.map((provider) => (
            <div key={provider.user.id} className="card">
              <Card
                className="card bg-tertiary"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <Card.Title
                  className="card-header"
                  style={{ backgroundColor: "#cacee8" }}
                >
                  Dr. {provider.name}
                </Card.Title>
                <Card.Body style={{ padding: "10px" }}>
                  <Card.Text>Address: {provider.address}</Card.Text>
                  <Card.Text>Phone: {provider.phone}</Card.Text>
                  <Card.Text>
                    Experience: {provider.experience} Years of Experience
                  </Card.Text>
                  <Card.Text>Fees: {provider.fees}</Card.Text>
                </Card.Body>

                <div
                  className="row"
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <Link
                    to={`/books/${provider.user}`}
                    className="btn btn-success col-6 border-white"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    to={`/profile/${provider.user}`}
                    className="btn btn-danger col-6 border-white"
                  >
                    See Full Profile
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
