import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div>
      <div className="div-title">
        <h2 className="center-verdana">Registration Successful</h2>
      </div>
      <div className="div-block">
        <p className="center-verdana">Thank you for your registration</p>
      </div>
      <div className="center-verdana div-block">
        <Link to="/welcome">Click to return to home page</Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
