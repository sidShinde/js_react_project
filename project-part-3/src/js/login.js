import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;

    if (email === "") {
      alert("Please enter email");
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter valid email");
      return false;
    } else if (password === "") {
      alert("Please enter password");
      return false;
    } else if (password.length < 8) {
      alert("Please enter a password with minimum 8 characters");
      return false;
    }

    let users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    if (users.length === 0) {
      alert("Wrong email or password");
      return false;
    } else {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].email.localeCompare(email) === 0 &&
          users[i].password.localeCompare(password) === 0
        ) {
          localStorage.setItem("loggedIn", JSON.stringify(users[i]));
          navigate("/loginSuccess");
          return true;
        }

        if (i === users.length - 1) {
          alert("Wrong email or password");
          return false;
        }
      }
    }
  };

  return (
    <div className="login-page">
      <div className="div-title">
        <h2 className="center-verdana">Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="div-block">
          <span className="login-email input-text"> Email </span>
          <span className="span-input input-text">
            <input
              type="text"
              id="email"
              placeholder="anne.hunter@mail.com"
              autoComplete="off"
              name="email"
            />
          </span>
        </div>
        <div className="div-block">
          <span className="login-password input-text"> Password </span>
          <span className="span-input input-text">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
            />
          </span>
        </div>
        <div className="div-block">
          <input className="login-input" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
