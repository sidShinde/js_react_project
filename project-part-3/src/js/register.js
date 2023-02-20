import { useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {
  const navigate = useNavigate();
  
  function handleSubmit(event) {
    const fullName = event.target.elements.fullName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    if (fullName === "") {
      alert("Please enter fullname");
      return false;
    } else if (email === "") {
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
    } else if (confirmPassword === "") {
      alert("Please enter confirm password");
      return false;
    } else if (password.localeCompare(confirmPassword) !== 0) {
      alert("Confirm password should be identical to password");
      return false;
    }

    let users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        alert("User already exists");
        return false;
      }
    }

    let userObj = {
      id: Number(new Date()),
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    users.push(userObj);
    let usersString = JSON.stringify(users);
    localStorage.setItem("users", usersString);

    navigate("/registerSuccess");
    return true;
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="div-block">
        <span className="span-name input-text"> Full Name </span>
        <span className="span-input input-text">
          <input
            type="text"
            placeholder="Anne Hunter"
            id="fullName"
            name="fullName"
          />
        </span>
      </div>
      <div className="div-block">
        <span className="span-email input-text"> Email </span>
        <span className="span-input input-text">
          <input
            type="text"
            placeholder="anne.hunter@mail.com"
            id="email"
            name="email"
          />
        </span>
      </div>
      <div className="div-block">
        <span className="span-password input-text"> Password </span>
        <span className="span-input input-text">
          <input type="password" id="password" name="password" />
        </span>
      </div>
      <div className="div-block">
        <span className="span-confirm-password input-text">
          {" "}
          Confirm Password{" "}
        </span>
        <span className="span-input input-text">
          <input type="password" id="confirm-password" name="confirmPassword" />
        </span>
      </div>
      <div className="div-block">
        <input className="register-input" type="submit" value="Register" />
      </div>
    </form>
  );
}

export default Register;
