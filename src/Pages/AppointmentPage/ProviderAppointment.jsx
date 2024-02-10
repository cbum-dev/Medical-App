import { Card, Spinner, Alert, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useUserRole from "../../Utils/CheckUser";

const Appointments = () => {
  const userRole = useUserRole();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvalAlert, setApprovalAlert] = useState(null);

  const apiCurrentUrl =
    userRole === "healthcare_provider"
      ? "https://medi-dep-bykw.vercel.app/api/upcoming-provider/"
      : "https://medi-dep-bykw.vercel.app/api/appointments/provider/";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(apiCurrentUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [apiCurrentUrl]);

  const handleApprove = async (appointmentId) => {
    try {
      await axios.put(
        `https://medi-dep-bykw.vercel.app/api/approve-appointment/${appointmentId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setAppointments((prevAppointments) => {
        return prevAppointments.map((prevAppointment) => {
          if (prevAppointment.id === appointmentId) {
            return {
              ...prevAppointment,
              is_approved: true,
            };
          }
          return prevAppointment;
        });
      });

      setApprovalAlert("Appointment Approved!");
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  return (
    <div className="container mt-5 rounded">
      <h1 className="bg-secondary pb-2 pt-1 px-3 mb-3 rounded text-light d-flex justify-content-between align-items-center">
        All Upcoming Appointments
        <Link to="/book/provider/all">
          <Button variant="primary">All Appointments</Button>
        </Link>
      </h1>
      {approvalAlert && (
        <Alert
          variant="success"
          onClose={() => setApprovalAlert(null)}
          dismissible
        >
          {approvalAlert}
        </Alert>
      )}
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
            <Card className="mb-3 bg-light border-secondary border-2">
              <Card.Body className="text-center">
                <Card.Text>No Appointments Right Now</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="mb-3 bg-light border-secondary border-2"
              >
                <Card.Body>
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
                    Appointment With: {appointment.user.name} | Phone:{" "}
                    {appointment.user.phone}
                  </Card.Text>
                  {userRole === "healthcare_provider" && (
                    <Card.Text>
                      Approval Status:{" "}
                      {appointment.is_approved ? "Approved" : "Not Approved"}
                    </Card.Text>
                  )}
                  {userRole === "healthcare_provider" && (
                    <Card.Text>
                      <button
                        className={`btn ${
                          appointment.is_approved ? "btn-danger" : "btn-success"
                        }`}
                        onClick={() => handleApprove(appointment.id)}
                      >
                        {appointment.is_approved ? "Approved !" : "Approve "}
                      </button>
                    </Card.Text>
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

export default Appointments;
