import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthcareProviderDetails = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/records/');
        const pdfFileUrl = response.data[1]?.report;

        if (pdfFileUrl) {
          setPdfUrl(pdfFileUrl);
        } else {
          console.error('PDF file URL not found in the API response.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {pdfUrl && (
        <div>
          <h2>Healthcare Provider Details</h2>
          <p>
            <a href={pdfUrl} target="_blank" download>
              Download PDF
            </a>
          </p>
          {/* <iframe title="pdf-viewer" src={pdfUrl} width="100%" height="600" /> */}
        </div>
      )}
    </div>
  );
};

export default HealthcareProviderDetails;
