import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("access_token"));
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const accessToken = localStorage.getItem("access_token");
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          const { data } = await axios.get(
            "https://medi-dep-bykw.vercel.app/api/upcoming/"
          );

          console.log(data);
          setMessage(data.message);
        } catch (error) {
          console.log("Not authenticated");
        }
      })();
    }
  }, []);
  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
  );
};
