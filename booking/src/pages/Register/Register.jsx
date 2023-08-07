import React, { useContext, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    img: "",
    isAdmin: false,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          className="rInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          id="img"
          className="rInput"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleRegister} className="rButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
