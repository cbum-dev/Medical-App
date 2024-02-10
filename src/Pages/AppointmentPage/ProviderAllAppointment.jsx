import React, { useState, useEffect } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/api/appointments/provider/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const generateReport = (appointmentId) => {
    console.log(`Generating report for appointment ${appointmentId}`);
  };

  return (
    <div className="container mt-5 rounded">
      <h1 className="bg-secondary pb-2 pt-1 px-3 mb-3 rounded text-light d-flex justify-content-between align-items-center">
        All Appointments
        <Link to="/book/provider">
          <Button variant="primary">Upcoming Appointments</Button>
        </Link>
      </h1>

      {loading ? (
        <Card className="mb-3 rounded border-secondary border-2">
          <Card.Body className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Card.Text>Loading Appointments...</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <>
          {appointments.length === 0 ? (
            <Card className="mb-3 border-secondary border-2">
              <Card.Body className="text-center">
                <Card.Text>No Appointments Right Now</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="mb-3 border-secondary border-2"
              >
                <Card.Body>
                  <Card.Title>
                    Date :{" "}
                    {new Date(
                      appointment.appointment_datetime
                    ).toLocaleDateString()}
                  </Card.Title>
                  <Card.Text>
                    Time :{" "}
                    {new Date(
                      appointment.appointment_datetime
                    ).toLocaleTimeString()}
                  </Card.Text>
                  <Card.Text>Description : {appointment.problem}</Card.Text>
                  <Card.Text>
                    Appointment With : {appointment.user.name} | Phone:{" "}
                    {appointment.user.phone}
                  </Card.Text>
                  <Card.Text>
                    Fees : {appointment.healthcare_provider.fees}
                  </Card.Text>
                  <Card.Text>
                    Approval Status :{" "}
                    {appointment.is_approved ? "Approved" : "Not Approved"}
                  </Card.Text>
                  {new Date(appointment.appointment_datetime) < new Date() && (
                    <Link to={`/record/${appointment.id}`}>
                      <Button variant="success">Generate Report</Button>
                    </Link>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AllAppointments;
