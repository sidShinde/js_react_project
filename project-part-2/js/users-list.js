const displayUsers = () => {
  users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  let table = document.getElementById("user-table");

  for (let i = 0; i < users.length; i++) {
    let row = ``;

    if (i % 2 == 0) {
      row += `<tr style="background-color: white">\n`;
    } else {
      row += `<tr style="background-color: rgb(229, 229, 229)">\n`;
    }

    let link = `./edit-users.html?userID=${users[i].id}`;

    row += `<td class="border-right">${users[i].fullName}</td>
            <td class="border-right table-col-2">${users[i].email}</td>
            <td class="table-col-3">
            <a href=${link}>Edit</a> \n`;

    if (users[i].email.localeCompare(loggedIn.email) != 0) {
      row += `| <a href="javascript:;" onclick='show(${JSON.stringify(
        users[i].id
      )})'>Delete</a>\n`;
    }

    row += `</td>
         </tr>`;

    table.innerHTML += row;
  }

  if (users.length < 14) {
    for (let i = users.length; i < 14 - users.length; i++) {
      let row = ``;

      if (i % 2 == 0) {
        row += `<tr style="background-color: white">\n`;
      } else {
        row += `<tr style="background-color: rgb(229, 229, 229)">\n`;
      }

      row += `<td class="border-right"></td>
              <td class="border-right"></td>
              <td class="table-col-3"></td>
            </tr>`;

      table.innerHTML += row;
    }
  }
};

const onLoad = () => {
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (loggedIn === null) {
    window.open("../html/welcome.html", "_self");
  } else {
    displayUsers();
    hide();
  }
};

const show = (userID) => {
  let deleteBox = document.getElementById("confirm-modal");
  deleteBox.style.display = "block"; // show confirm modal

  deleteBox.innerHTML = `<div class="modal-title">
    <div class="modal-title-text">Confirm User Deletion</div>
      <div class="modal-close">
        <img class="modal-cross" src="../images/close.png" onclick="hide()" />
      </div>
    </div>
    <div class="confirm-body">
      <div class="confirm-message">
        <div class="confirm-question">
          <img src="../images/question.png" />
        </div>
        <div class="confirm-text">Are you sure?</div>
      </div>
      <div class="confirm-button">
        <a href="javascript:;" class="button" onclick='removeUser(${JSON.stringify(
          userID
        )})'>Ok</a>
        <a href="javascript:;" class="button" onclick="hide()">Cancel</a>
      </div>
    </div>`;
};

const hide = () => {
  document.getElementById("confirm-modal").style.display = "none"; // hide confirm modal
};

const removeUser = (userID) => {
  let users = JSON.parse(localStorage.getItem("users"));

  // remove user from users storage
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userID) {
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
    if (chats[i].userID != userID) {
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
    if (uploads[i].userID != userID) {
      newUploads.push(uploads[i]);
    }
  }

  localStorage.setItem("uploads", JSON.stringify(newUploads));

  hide();
};
