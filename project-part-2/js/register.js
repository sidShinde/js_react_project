let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const validateRegister = () => {
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (fullName == "") {
    alert("Please enter fullname");
    return false;
  } else if (email == "") {
    alert("Please enter email");
    return false;
  } else if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter valid email");
    return false;
  } else if (password == "") {
    alert("Please enter password");
    return false;
  } else if (password.length < 8) {
    alert("Please enter a password with minimum 8 characters");
    return false;
  } else if (confirmPassword == "") {
    alert("Please enter confirm password");
    return false;
  } else if (password.localeCompare(confirmPassword) != 0) {
    alert("Confirm password should be identical to password");
    return false;
  }

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
  return true;
}
