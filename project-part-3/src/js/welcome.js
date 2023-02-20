import "../css/welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
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
    </>
  );
};

export default Welcome;
