const onLoad = () => {
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (loggedIn === null) {
    window.open("../html/welcome.html", "_self");
  } else {
    hideEdit();
    hideUpload();
    hideDelete();

    displayUploads();
  }
};

const showUpload = () => {
  document.getElementById("div-button").style.backgroundColor = "white";

  let uploadBox = document.getElementById("upload-modal");
  uploadBox.style.display = "block";

  uploadBox.innerHTML = `<div class="modal-title">
        <div class="modal-title-text">Upload</div>
        <div class="modal-close">
          <img
            class="modal-cross"
            src="../images/close.png"
            onclick="hideUpload()"
          />
        </div>
      </div>
      <div class="file-desc">
        <span class="file-desc-text"> File Description </span>
        <span>
          <input
            class="file-desc-input"
            type="text"
            placeholder="Sample File"
            id="file-desc-input"
          />
        </span>
      </div>
      <div class="file-upload">
        <span> File Upload </span>
        <span>
          <button>Choose File</button>
        </span>
        <span>
          <input type="text" id="file-name-input" placeholder="Enter file name"
        /></span>
      </div>
      <div class="upload-button">
        <a href="javascript:;" onclick="addUpload()">Upload Now</a>
        <a href="javascript:;" onclick="hideUpload()">Cancel</a>
      </div>`;
};

const hideUpload = () => {
  document.getElementById("upload-modal").style.display = "none"; // hide upload modal
  document.getElementById("div-button").style.backgroundColor = "aqua";
};

const showEdit = (uploadID) => {
  document.getElementById("div-button").style.backgroundColor = "white";

  let editBox = document.getElementById("edit-modal");
  editBox.style.display = "block";

  editBox.innerHTML += `<div class="modal-title">
        <div class="modal-title-text">Edit</div>
        <div class="modal-close">
          <img
            class="modal-cross"
            src="../images/close.png"
            onclick="hideEdit()"
          />
        </div>
      </div>
      <div class="file-desc">
        <span class="file-desc-text"> File Description </span>
        <span>
          <input
            class="file-desc-input"
            type="text"
            id = "edit-desc"
          />
        </span>
      </div>
      <div class="edit-button">
        <a href="javascript:;" onclick='editFile(${uploadID})'>Save</a>
        <a href="javascript:;" onclick="hideEdit()">Cancel</a>
      </div>`;
};

const editFile = (uploadID) => {
  const uploads = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  const editDesc = document.getElementById("edit-desc").value;

  if (editDesc == "") {
    alert("Please enter a file description");
    return false;
  }

  for (let i = 0; i < uploads.length; i++) {
    if (uploads[i].id === uploadID) {
      uploads[i].label = editDesc;
    }
  }

  localStorage.setItem("uploads", JSON.stringify(uploads));
  hideEdit();
};

const hideEdit = () => {
  document.getElementById("edit-modal").style.display = "none"; // hide edit modal
  document.getElementById("div-button").style.backgroundColor = "aqua";
};

const showDelete = (uploadID) => {
  document.getElementById("div-button").style.backgroundColor = "white";

  const deleteBox = document.getElementById("confirm-modal");
  deleteBox.style.display = "block";

  deleteBox.innerHTML = `<div class="modal-title">
        <div class="modal-title-text">Confirm User Deletion</div>
        <div class="modal-close">
          <img
            class="modal-cross"
            src="../images/close.png"
            onclick="hideDelete()"
          />
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
          <a href="javascript:;" class="button" onclick='deleteFile(${uploadID})'>Ok</a>
          <a href="javascript:;" class="button" onclick="hideDelete()"
            >Cancel</a
          >
        </div>`;
};

const deleteFile = (uploadID) => {
  const uploads = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  let i;
  for (i = 0; i < uploads.length; i++) {
    if (uploads[i].id === uploadID) {
      uploads.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("uploads", JSON.stringify(uploads));
  hideDelete();
};

const hideDelete = () => {
  document.getElementById("confirm-modal").style.display = "none"; // hide delete modal
  document.getElementById("div-button").style.backgroundColor = "aqua";
};

const displayUploads = () => {
  const uploads = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  let myUploads = document.getElementById("my-uploads-table");
  let otherUploads = document.getElementById("other-uploads-table");

  let myDocs = 0;
  let otherDocs = 0;
  for (let i = 0; i < uploads.length; i++) {
    let row = ``;

    if (uploads[i].userID === loggedIn.id) {
      if (myDocs % 2 == 0) {
        row += `<tr style="background-color: white">\n`;
      } else {
        row += `<tr style="background-color: rgb(229, 229, 229)">\n`;
      }

      myDocs += 1;

      row += `  <td class="border-right">${uploads[i].label}</td>
                <td class="border-right table-col-2">${uploads[i].fileName}</td>
                <td class="table-col-3">
                    <a href="javascript:;" onclick='showEdit(${JSON.stringify(
                      uploads[i].id
                    )})'>Edit</a> |
                    <a href="javascript:;" onclick='showDelete(${JSON.stringify(
                      uploads[i].id
                    )})'>Delete</a>
                </td>
              </tr>`;

      myUploads.innerHTML += row;
    } else {
      if (otherDocs % 2 == 0) {
        row += `<tr style="background-color: white">\n`;
      } else {
        row += `<tr style="background-color: rgb(229, 229, 229)">\n`;
      }

      otherDocs += 1;

      row += `  <td class="border-right">${uploads[i].label}</td>
                <td class="border-right table-col-2">${uploads[i].fileName}</td>
                <td class="table-col-3">${uploads[i].userEmail}</td>
              </tr>`;

      otherUploads.innerHTML += row;
    }
  }
};

const addUpload = () => {
  const uploads = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  const fileDesc = document.getElementById("file-desc-input").value;
  if (fileDesc == "") {
    alert("Please enter file description");
    return false;
  }

  const fileName = document.getElementById("file-name-input").value;
  if (fileName == "") {
    alert("Please enter file name");
    return false;
  }

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const uploadObj = {
    id: Number(new Date()),
    userID: loggedIn.id,
    userEmail: loggedIn.email,
    label: fileDesc,
    fileName: fileName,
  };

  uploads.push(uploadObj);
  localStorage.setItem("uploads", JSON.stringify(uploads));
  hideUpload();

  // show the added file in the table
  let myUploads = document.getElementById("my-uploads-table");
  let row = ``;
  let rowNum = uploads.length;
  if (rowNum % 2 == 0) {
    row += `<tr style="background-color: rgb(229, 229, 229)">\n`;
  } else {
    row += `<tr style="background-color: white">\n`;
  }

  row += `<td class="border-right">${uploadObj.label}</td>
            <td class="border-right table-col-2">${uploadObj.fileName}</td>
            <td class="table-col-3">
                <a href="javascript:;" onclick='showEdit(${JSON.stringify(
                  uploadObj.id
                )})'>Edit</a> |
                <a href="javascript:;" onclick='showDelete(${JSON.stringify(
                  uploadObj.id
                )})'>Delete</a>
            </td>
          </tr>`;

  myUploads.innerHTML += row;
};
