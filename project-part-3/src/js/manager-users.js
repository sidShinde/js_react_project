import { Link } from "react-router-dom";
import "../css/manage-users.css";

function User(props) {
  const user = props.user;
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const handleDelete = () => {
    let users = JSON.parse(localStorage.getItem("users"));

    // remove user from users storage
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        users.splice(i, 1);
        break;
      }
    }
  
    localStorage.setItem("users", JSON.stringify(users));
  
    // remove all chats belonging to the user
    let chats = localStorage.getItem("chats")
      ? JSON.parse(localStorage.getItem("chats"))
      : [];
  
    let newChats = [];
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].userID !== user.id) {
        newChats.push(chats[i]);
      }
    }
  
    localStorage.setItem("chats", JSON.stringify(newChats));
  
    // remove all uploads belonging to the user
    let uploads = localStorage.getItem("uploads")
      ? JSON.parse(localStorage.getItem("uploads"))
      : [];
  
    let newUploads = [];
    for (let i = 0; i < uploads.length; i++) {
      if (uploads[i].userID !== user.id) {
        newUploads.push(uploads[i]);
      }
    }
  
    localStorage.setItem("uploads", JSON.stringify(newUploads));  

    window.location.reload(false);
  };

  if (user.id === loggedIn.id) {
    return (
      <tr>
        <td className="table-col-1">{user.fullName}</td>
        <td className="table-col-2">{user.email}</td>
        <td className="table-col-3">
          <Link to="/edit-users" state={{ userID: user.id }}>
            Edit
          </Link>
        </td>
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirm User Deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are you sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Ok
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    );
  } else {
    return (
      <tr>
        <td className="table-col-1">{user.fullName}</td>
        <td className="table-col-2">{user.email}</td>
        <td className="table-col-3">
          <Link to="/edit-users" state={{ userID: user.id }}>
            Edit
          </Link>{" "}
          |{" "}
          <a
            href="javascript;"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete
          </a>
        </td>
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirm User Deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are you sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Ok
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    );
  }
}

function ManageUsers() {
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  return (
    <div className="user-table">
      <div className="div-title">
        <h2>Users</h2>
      </div>
      <table className="div-table">
        <thead>
          <tr>
            <th className="table-col-1">Name</th>
            <th className="table-col-2">User Email ID</th>
            <th className="table-col-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
