import { Link } from "react-router-dom";
import "../css/welcome.css";

function Logout() {
  localStorage.removeItem("loggedIn");

  return (
    <>
      <div className="div-block">
        <h2 className="center-verdana">Welcome to Users Module</h2>
      </div>
      <div className="div-block">
        <p className="center-verdana">Existing Users</p>
      </div>
      <div className="div-block center-verdana">
        <Link to="/login" className="button login-btn">
          Login
        </Link>
      </div>
      <div className="div-block center-verdana">
        <p>New Users</p>
      </div>
      <div className="div-block center-verdana">
        <Link to="/register" className="button register-btn">
          Register
        </Link>
      </div>
      <div className="div-block center-verdana">
        <h4>You have been logged out</h4>
      </div>
    </>
  );
}

export default Logout;
