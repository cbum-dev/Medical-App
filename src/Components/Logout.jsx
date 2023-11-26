// import { useEffect } from 'react';
// import axios from 'axios';

// export const Logout = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         // Send a POST request to the logout endpoint with the refresh token
//         const { data } = await axios.post(
//           'http://localhost:8000/logout/',
//           {
//             refresh_token: localStorage.getItem('refresh_token'),
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             withCredentials: true,
//           }
//         );

//         // Clear local storage and set Authorization header to null
//         localStorage.clear();
//         axios.defaults.headers.common['Authorization'] = null;

//         // Redirect to the login page
//         window.location.href = '/login';
//       } catch (error) {
//         console.log('Logout not working', error);
//       }
//     })();
//   }, []);

//   return <div></div>; // Return an empty JSX div
// };


import { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      console.log(localStorage.getItem('access_token'))
      console.log(localStorage.getItem('refresh_token'))
      try {
        const accessToken = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Call the logout API endpoint on the server
        await axios.post(
          'http://127.0.0.1:8000/logout/',
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        // Clear tokens from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Clear the Authorization header
        delete axios.defaults.headers.common['Authorization'];

        // Redirect to the login page or any other desired location
        window.location.href = '/blog/';
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logout();
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  return null; // or you can render a component if needed
};

export default Logout;
