import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file you created

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const handleSlide = (e) => {
    console.log("Before toggle:", isLogin);
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      // Make the API call to the backend for registration or login
      const response = await fetch(
        "http://localhost:3500/api/auth" + (isLogin ? "/login" : "/register"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      console.log(
        "http://localhost:8080/api/auth" + (isLogin ? "/login" : "/register")
      );
      console.log("line 45", userData);
      // Handle the response based on success or failure
      if (response.ok) {
        // Registration or login successful, you can redirect or show a success message
        const data = await response.json();
        console.log(data);
          // If the user is logged in successfully, redirect to the profile page
      if (isLogin) {
        navigate("/user");
        
      } else {
        console.log(data); // Handle registration success logic
      } // Replace this with your desired logic (e.g., redirect or show success message)
      } else {
        // Registration or login failed, handle the error response
        const errorData = await response.json();
        console.error(errorData); // Replace this with your desired error handling logic
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className={`wrapper ${isLogin ? "login" : "signup"}`}>
      <div className="title-text">
        <div className={`title ${isLogin ? "login" : "signup"}`}>
          {isLogin ? "Login Form" : "Signup Form"}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={handleSlide}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={handleSlide}
          />
          <label htmlFor="login" className="slide login" onClick={handleSlide}>
            Login
          </label>
          <label
            htmlFor="signup"
            className="slide signup"
            onClick={handleSlide}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {isLogin ? (
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
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Create an account <a href="">Signup now</a>
              </div>
            </form>
          ) : (
            <form className="signup" onSubmit={handleSubmit}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
              <div className="signup-link">
                Already have an account? <a href="">Login</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
