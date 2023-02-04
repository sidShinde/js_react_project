const validateLogin = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email == "") {
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
  }

  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (users.length == 0) {
    alert("Wrong email or password");
    return false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email.localeCompare(email) == 0 &&
        users[i].password.localeCompare(password) == 0
      ) {
        localStorage.setItem("loggedIn", JSON.stringify(users[i]));
        return true;
      }

      if (i == users.length - 1) {
        alert("Wrong email or password");
        return false;
      }
    }
  }
};
