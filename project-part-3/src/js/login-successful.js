import "../css/login-success.css";

const LoginSuccess = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  return (
    <div>
      <div className="div-title">
        <p className="center-verdana">Login Successful</p>
      </div>
      <div className="center-verdana div-text">
        <b>Welcome!</b> {loggedIn.email}
      </div>
    </div>
  );
};

export default LoginSuccess;
