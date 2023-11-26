// Import the required React packages
import axios from "axios";
import { useState } from "react";

// Define the Login component
export const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Create the submit method
  const submit = async (e) => {
    e.preventDefault();

    // Create the user object
    const user = {
      username: username,
      password: password
    };

    // Create the POST request
    try {
      const { data } = await axios.post(
        'http://localhost:8000/token/',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      // Initialize the access & refresh token in localStorage
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
    console.log(localStorage.getItem('access_token'))
      // Set authorization header for axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, e.g., show error message to the user
    }
  };

  // JSX content for the Login component
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Passwords</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
