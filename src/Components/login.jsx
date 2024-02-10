import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      if (response.data.role === "unknown") {
        navigate("/register/user/basic");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    try {
      const { data } = await axios.post(
        "https://medi-dep-bykw.vercel.app/token/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      console.log(localStorage.getItem("access_token"));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
      checkUserRole();
    } catch (error) {
      console.error("Error during login:", error);
      alert("Please Enter A Valid Username Or Password And Try Again.");
      window.location.href = "/login";
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body border-secondary border-2">
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <div className="mt-3">
                <p className="mb-0">Not a user? </p>
                <button className="btn btn-success pt-0 pb-0">
                  <Link
                    to="/register"
                    className="btn btn-link text-white mb-0"
                    onClick={handleRegisterRedirect}
                  >
                    Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
