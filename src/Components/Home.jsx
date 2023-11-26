// Import the required React packages
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Home component
export const Home = () => {
  // State variable for the message
  const [message, setMessage] = useState('');

  // useEffect to handle component lifecycle and fetch data
  useEffect(() => {
    console.log(localStorage.getItem('access_token'))
    // Check if access_token is not present in localStorage, redirect to login
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    } else {
      // Fetch data from the home endpoint
      (async () => {
        try {
          const accessToken = localStorage.getItem('access_token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // console.log('access_token')
          // const userId = 6; 
          const { data } = await axios.get(
            'http://127.0.0.1:8000/api/upcoming/',
          );


          console.log(data)
          // console.log('User ID:', message);
          // console.log('Email:', data.email);

          setMessage(data.message);
        } catch (error) {
          console.log('Not authenticated');
        }
      })();
    }
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  // JSX content for the Home component
  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
  );
};
