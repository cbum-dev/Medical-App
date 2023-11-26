// Import necessary components from React Bootstrap
import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserRole from "../../Utils/CheckUser";

const MyAppointments = () => {
  const userRole = useUserRole();
  console.log(userRole);
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/myappointments/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
    };

    fetchAppointments();
  }, []);
  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/upcoming/`,
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
    <div>
      <h2 className="bg-primary d-flex ">Upcoming Appointments</h2>
      {upcomingAppointments.map((appointment) => (
        <div
          className="container d-flex bg-primary mb-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card key={appointment.id} style={{ width: "100%", margin: "10px" }}>
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
              <Card.Text>{`Description: ${appointment.problem}`}</Card.Text>
              <Card.Text>{`Appointment With : ${appointment.healthcare_provider.name} || Phone : ${appointment.healthcare_provider.phone} || Fees : ${appointment.healthcare_provider.fees}`}</Card.Text>
              <Card.Text> Reschedule</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
      <h2 className="bg-success d-flex">Your Appointments</h2>
      {appointments.map((appointment) => (
        <div
          className="container d-flex bg-success"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card key={appointment.id} style={{ width: "100%", margin: "10px" }}>
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
              <Card.Text>{`Description: ${appointment.problem}`}</Card.Text>
              <Card.Text>{`Appointment With : ${appointment.healthcare_provider.name}`}</Card.Text>
              <Card.Text>{`Description: ${appointment.user.user}`}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
