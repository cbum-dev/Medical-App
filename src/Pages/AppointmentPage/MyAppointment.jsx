import { Card, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserRole from "../../Utils/CheckUser";

const MyAppointments = () => {
  const userRole = useUserRole();
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `https://medi-dep-bykw.vercel.app/api/aappointments/`,
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

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await axios.get(
          `https://medi-dep-bykw.vercel.app/api/upcoming/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUpcomingAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchUpcomingAppointments();
  }, []);

  return (
    <div className="container mt-5 rounded">
      <h2 className="bg-primary text-light p-2 mb-4 rounded border-secondary border-2">
        Upcoming Appointments
      </h2>
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
          {upcomingAppointments.length === 0 ? (
            <Card className="mb-3 rounded border-secondary border-2">
              <Card.Body className="text-center">
                <Card.Text>No Appointments Right Now</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="mb-3 rounded border-secondary border-2"
              >
                <Card.Body className="bg-dark text-light">
                  <Card.Title>
                    Date:{" "}
                    {new Date(
                      appointment.appointment_datetime
                    ).toLocaleDateString()}
                  </Card.Title>
                  <Card.Text>
                    Time:{" "}
                    {new Date(
                      appointment.appointment_datetime
                    ).toLocaleTimeString()}
                  </Card.Text>
                  <Card.Text>Description: {appointment.problem}</Card.Text>
                  <Card.Text>
                    Appointment With: {appointment.healthcare_provider.name} |
                    Phone: {appointment.healthcare_provider.phone} | Fees:{" "}
                    {appointment.healthcare_provider.fees}
                  </Card.Text>
                  <Card.Text>Reschedule</Card.Text>
                  <Card.Text>
                    Approval Status :{" "}
                    {appointment.is_approved ? "Approved" : "Not Approved"}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </>
      )}

      <h2 className="bg-success text-light p-2 mb-4 rounded border-secondary border-2">
        Your Appointments
      </h2>

      {loading ? (
        <Card className="mb-3 rounded border-secondary border-2">
          <Card.Body className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Card.Text>Loading Appointments...</Card.Text>
          </Card.Body>
        </Card>
      ) : appointments.length === 0 ? (
        <Card className="mb-3 border-secondary border-2">
          <Card.Body className="text-center">
            <Card.Text>No Appointments Right Now</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} className="mb-3 border-secondary border-2">
            <Card.Body>
              <Card.Title>
                Date:{" "}
                {new Date(
                  appointment.appointment_datetime
                ).toLocaleDateString()}
              </Card.Title>
              <Card.Text className="fw-bold">
                Appointment With: {appointment.healthcare_provider.name} |
                <span className="fw-bold">
                  {" "}
                  Contact Number: {appointment.healthcare_provider.phone}
                </span>{" "}
                | Fees: {appointment.healthcare_provider.fees}
              </Card.Text>
              <Card.Text>
                Time:{" "}
                {new Date(
                  appointment.appointment_datetime
                ).toLocaleTimeString()}
              </Card.Text>
              <Card.Text>Description: {appointment.problem}</Card.Text>
              <Card.Text>
                {" "}
                Appointment With : {appointment.healthcare_provider.name}
              </Card.Text>
              <Card.Text>
                {" "}
                Contact Number : {appointment.healthcare_provider.phone}
              </Card.Text>
              <Card.Text>Description: {appointment.problem}</Card.Text>
              <Card.Text>
                Status: {appointment.is_approved ? "Approved" : "Not Approved"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyAppointments;
