import { useEffect } from "react";
import axios from "axios";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      console.log(localStorage.getItem("access_token"));
      console.log(localStorage.getItem("refresh_token"));
      try {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        await axios.post(
          "https://medi-dep-bykw.vercel.app/logout/",
          { refresh_token: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        delete axios.defaults.headers.common["Authorization"];

        window.location.href = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logout();
  }, []);
  return null;
};

export default Logout;
