import { useState } from "react";
import "../css/manage-documents.css";

function Doc(props) {
  const doc = props.doc;
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (doc.userID === loggedIn.id) {
    return (
      <tr className="docs-table-row">
        <td className="table-col-1">{doc.label}</td>
        <td className="table-col-2">{doc.fileName}</td>
        <td className="table-col-3">
          <a
            href="javascript;"
            data-bs-toggle="modal"
            data-bs-target="#editDocsModal"
          >
            Edit
          </a>
          <EditDocsModal uploadID={doc.id} /> |{" "}
          <a
            href="javascript;"
            data-bs-toggle="modal"
            data-bs-target="#deleteDocsModal"
          >
            Delete
          </a>
          <DeleteDocsModal uploadID={doc.id} />
        </td>
      </tr>
    );
  } else {
    return (
      <tr className="docs-table-row">
        <td className="table-col-1">{doc.label}</td>
        <td className="table-col-2">{doc.fileName}</td>
        <td className="table-col-3">{doc.userEmail}</td>
      </tr>
    );
  }
}

function AddUploadModal() {
  const [fileDesc, setFileDesc] = useState("");
  const [fileName, setFileName] = useState("");

  const handleUpload = () => {
    const uploads = localStorage.getItem("uploads")
      ? JSON.parse(localStorage.getItem("uploads"))
      : [];

    if (fileDesc === "") {
      alert("Please enter file description");
      return false;
    }

    if (fileName === "") {
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

    window.location.reload(false);
  };

  return (
    <div
      className="modal fade"
      id="addUploadModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Upload
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <span>File Description</span>
              <span>
                <input
                  type="text"
                  placeholder="Sample File"
                  onChange={(e) => {
                    setFileDesc(e.target.value);
                  }}
                ></input>
              </span>
            </div>
            <div className="modal-div-2">
              <span>File Upload</span>
              <span>
                <button>Choose File</button>
              </span>
              <span>
                <input
                  type="text"
                  placeholder="Sample.doc"
                  onChange={(e) => {
                    setFileName(e.target.value);
                  }}
                ></input>
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleUpload}
            >
              Upload Now
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
  );
}

function EditDocsModal(props) {
  const [fileDesc, setFileDesc] = useState("");
  const uploadID = props.uploadID;

  const handleEdit = () => {
    const uploads = localStorage.getItem("uploads")
      ? JSON.parse(localStorage.getItem("uploads"))
      : [];
    if (fileDesc === "") {
      alert("Please enter a file description");
      return false;
    }

    for (let i = 0; i < uploads.length; i++) {
      if (uploads[i].id === uploadID) {
        uploads[i].label = fileDesc;
      }
    }

    localStorage.setItem("uploads", JSON.stringify(uploads));
    window.location.reload(false);
  };

  return (
    <div
      className="modal fade"
      id="editDocsModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <span>File Description</span>
              <span>
                <input
                  type="text"
                  placeholder="Sales Report"
                  onChange={(e) => {
                    setFileDesc(e.target.value);
                  }}
                ></input>
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleEdit}
            >
              Save
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
  );
}

function DeleteDocsModal(props) {
  const uploadID = props.uploadID;

  const handleDelete = () => {
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

    window.location.reload(false);
  };

  return (
    <div
      className="modal fade"
      id="deleteDocsModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Confirm File Deletion
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>Are you sure?</div>
          </div>
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
  );
}

function ManageDocuments() {
  const docs = localStorage.getItem("uploads")
    ? JSON.parse(localStorage.getItem("uploads"))
    : [];

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  let myDocs = [];
  let otherDocs = [];

  for (let i = 0; i < docs.length; i++) {
    if (docs[i].userID === loggedIn.id) {
      myDocs.push(docs[i]);
    } else {
      otherDocs.push(docs[i]);
    }
  }

  return (
    <div className="docs-page">
      <div className="my-docs"></div>
      <div className="my-docs-title">My Uploads</div>
      <div>
        <table className="my-docs-table">
          <thead>
            <tr>
              <th className="table-col-1">Label</th>
              <th className="table-col-2">File Name</th>
              <th className="table-col-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {myDocs.map((doc, index) => (
              <Doc key={index} doc={doc} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="other-docs">
        <div className="other-docs-title">Shared Uploads</div>
        <div>
          <table className="other-docs-table">
            <thead>
              <tr>
                <th className="table-col-1">Label</th>
                <th className="table-col-2">File Name</th>
                <th className="table-col-3">Shared by</th>
              </tr>
            </thead>
            <tbody>
              {otherDocs.map((doc, index) => (
                <Doc key={index} doc={doc} />
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            className="add-upload-btn"
            data-bs-toggle="modal"
            data-bs-target="#addUploadModal"
          >
            + Add Upload
          </button>
          <AddUploadModal />
        </div>
      </div>
    </div>
  );
}

export default ManageDocuments;
