const editUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userID = Number(urlParams.get("userID"));

  const fullName = document.getElementById("full-name").value;
  if (fullName == "") {
    alert("Please enter full name");
    return false;
  }

  const email = document.getElementById("email").value;
  if (email == "") {
    alert("Please enter email");
    return false;
  } else if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter valid email");
    return false;
  }

  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userID) {
      users[i].fullName = fullName;
      users[i].email = email;
      break;
    }
  }

  localStorage.setItem("users", JSON.stringify(users));

  // update logged in user details
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  if (loggedIn.id === userID) {
    loggedIn.fullName = fullName;
    loggedIn.email = email;
  }

  localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

  // update chats table
  let chats = localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [];

  for (let i = 0; i < chats.length; i++) {
    if (chats[i].userID === userID) {
      chats[i].userName = fullName;
    }
  }

  localStorage.setItem("chats", JSON.stringify(chats));

  // update uploads table
  let uploads = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  for (let i = 0; i < uploads.length; i++) {
    if (uploads[i].userID === userID) {
      uploads[i].userEmail = email;
    }
  }

  localStorage.setItem("uploads", JSON.stringify(uploads));
};
