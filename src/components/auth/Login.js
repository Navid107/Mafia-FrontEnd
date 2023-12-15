import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import AuthService from "./AuthService";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Create an object to send as the request body
    AuthService.login(email, password).then(
      () => {
        navigate("/user");
        window.location.reload();
      },
      (error) => {
        setMessage("Invalid Email and Password");
      }
    );
  }

  return (
    <div className="form-container">
      <div className="form-inner">
        <form className="login" onSubmit={handleSubmit}>
          {/* Add the name field */}
          <div className="field">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="field btn"> Login
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Create an account <a href="/signup">Signup now</a>
          </div>
        </form>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>

  );
};

export default Login;
