import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateHealthRecord = () => {
  const { appointmentId } = useParams();
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      console.error("Authentication token not found.");
      return;
    }

    setToken(storedToken);

    const checkUserRole = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/check/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    checkUserRole();
  }, []);

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("report", reportFile);

      await axios.post(
        `https://medi-dep-bykw.vercel.app/api/records/create/${appointmentId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Health record created successfully");
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error creating health record:", error);
    }
  };

  if (userRole !== "healthcare_provider") {
    return <div>You do not have permission to access this page.</div>;
  }
  if (uploadSuccess) {
    return <Navigate to={`/record`} />;
  }
  return (
    <div className="container mt-4">
      <h2 className="mb-4 border-secondary border-2">Create Health Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Upload Report:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit" variant="primary">
          Upload Report
        </Button>
      </Form>
    </div>
  );
};

export default CreateHealthRecord;
