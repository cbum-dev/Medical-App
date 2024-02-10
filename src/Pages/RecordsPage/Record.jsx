import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const HealthcareProviderDetails = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/check/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");
        if (!storedToken) {
          console.error("Authentication token not found.");
          return;
        }

        setToken(storedToken);

        const apiEndpoint =
          userRole === "healthcare_provider"
            ? "https://medi-dep-bykw.vercel.app/api/records-provider/"
            : "https://medi-dep-bykw.vercel.app/api/records/";

        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const pdfFileUrls = response.data.map((record) => record.report);

        if (pdfFileUrls.length > 0) {
          setPdfUrls(pdfFileUrls);
        } else {
          console.error("No PDF file URLs found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchData();
    }
  }, [userRole]);

  const handleViewReport = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="container mt-4">
      {loading && (
        <Card className="mb-3 rounded border-secondary border-2">
          <Card.Body className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Card.Text>Loading...</Card.Text>
          </Card.Body>
        </Card>
      )}

      {!loading && pdfUrls.length > 0 && (
        <div>
          <h2 className="mb-4 border-secondary border-2">
            Healthcare Provider Details
          </h2>
          <ListGroup>
            {pdfUrls.map((pdfUrl, index) => (
              <ListGroup.Item key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>Report : {index + 1}</Card.Title>
                    <Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleViewReport(pdfUrl)}
                      >
                        View Report
                      </Button>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        download
                        rel="noreferrer"
                      >
                        <Button variant="success" className="ms-2">
                          Download
                        </Button>
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {!loading && pdfUrls.length === 0 && (
        <Card className="mb-3 rounded border-secondary border-2">
          <Card.Body className="text-center">
            <Card.Text>No Records Found</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default HealthcareProviderDetails;
