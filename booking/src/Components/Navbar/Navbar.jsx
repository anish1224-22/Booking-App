import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const Navbar = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
    const handleLogout = async () => {
      try {
        await axios.post("/logout");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="logo">ThanosBooks</span>
        </Link>
        {user ? (
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <span
              style={{
                backgroundColor: "orange",
                padding: "0.2rem",
                marginRight: "1.5rem",
                marginTop: "0.2rem",
                color:'white'
              }}
            >
              {user.username}
            </span>
            <button style={{backgroundColor:'white',marginTop:'0.2rem', cursor:'pointer'}} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
