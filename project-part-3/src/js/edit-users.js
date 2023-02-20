import { useLocation } from "react-router-dom";
import "../css/edit-users.css";

function EditUsers() {
  let { state } = useLocation();

  function handleSave(event) {
    const fullName = event.target.elements.fullName.value;
    if (fullName === "") {
      alert("Please enter full name");
      return false;
    }

    const email = event.target.elements.email.value;
    if (email === "") {
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
      if (users[i].id === state.userID) {
        users[i].fullName = fullName;
        users[i].email = email;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));

    // update logged in user details
    let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedIn.id === state.userID) {
      loggedIn.fullName = fullName;
      loggedIn.email = email;
    }

    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

    // update chats table
    let chats = localStorage.getItem("chats")
      ? JSON.parse(localStorage.getItem("chats"))
      : [];

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].userID === state.userID) {
        chats[i].userName = fullName;
      }
    }

    localStorage.setItem("chats", JSON.stringify(chats));

    // update uploads table
    let uploads = localStorage.getItem("uploads")
      ? JSON.parse(localStorage.getItem("uploads"))
      : [];

    for (let i = 0; i < uploads.length; i++) {
      if (uploads[i].userID === state.userID) {
        uploads[i].userEmail = email;
      }
    }

    localStorage.setItem("uploads", JSON.stringify(uploads));
  }

  return (
    <form className="edit-users" onSubmit={handleSave}>
      <div className="div-title">
        <h2 className="center-verdana">Edit User Information</h2>
      </div>
      <div className="div-block">
        <span className="span-name input-text"> Full Name </span>
        <span className="span-input input-text">
          <input
            type="text"
            id="full-name"
            name="fullName"
            placeholder="Anne Hunter"
          />
        </span>
      </div>
      <div className="div-block">
        <span className="span-email input-text"> Email </span>
        <span className="span-input input-text">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="anne.hunter@mail.com"
          />
        </span>
      </div>
      <div className="div-block">
        <input type="submit" value="Save" />
      </div>
    </form>
  );
}

export default EditUsers;
