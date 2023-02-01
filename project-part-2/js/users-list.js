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

    row += `<td class="border-right">${users[i].fullName}</td>
            <td class="border-right table-col-2">${users[i].email}</td>
            <td class="table-col-3">
            <a href="./edit-users.html">Edit</a> \n`;

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
  displayUsers();
  hide();
};

const show = (userID) => {
  let deleteBox = document.getElementById("confirm-modal");
  deleteBox.style.display = "block"; // show confirm modal

  deleteBox.innerHTML += `<div class="modal-title">
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

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userID) {
      users.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("users", JSON.stringify(users));
  hide();
  displayUsers();
};
