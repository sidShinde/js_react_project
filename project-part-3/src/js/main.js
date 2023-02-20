import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/style.css";
import Nav from "./nav";
import Welcome from "./welcome";
import Login from "./login";
import Register from "./register";
import LoginSuccess from "./login-successful";
import RegisterSuccess from "./register-successful";
import GroupChat from "./group-chat";
import ManageUsers from "./manager-users";
import EditUsers from "./edit-users";
import ManageDocuments from "./manage-documents";
import Logout from "./logout";
import NotFound from "./not-found";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route index path="welcome" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerSuccess" element={<RegisterSuccess />} />
        <Route path="logout" element={<Logout />} />
        <Route path="/" element={<Nav />}>
          <Route path="loginSuccess" element={<LoginSuccess />} />
          <Route path="chat" element={<GroupChat />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="edit-users" element={<EditUsers />} />
          <Route path="documents" element={<ManageDocuments />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
