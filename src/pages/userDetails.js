import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
export const UserDetails = () => {
  const navigate = useNavigate();
  const { LogOut, updateUser } = useAuth();
  const [userData, setData] = useState({});
  const [editState, setEditstate] = useState(false);
  const [newUsername, setUsername] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  useEffect(() => {
    (async function () {
      const localUser = JSON.parse(localStorage.getItem("VideoAuthDetails"));
      const id = localUser.id;
      const response = await axios.get(
        `https://videoplex-backend.herokuapp.com/user/${id}`
      );
      setData(response.data.user);
    })();
  }, []);
  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
  }, [userData]);
  async function updateuserHandler(newUsername, newEmail, newPassword) {
    const response = await updateUser(newUsername, newEmail, newPassword);
    if (response.success) setEditstate(false);
  }
  function logoutHandler() {
    LogOut();
    navigate("/");
  }
  return (
    <div className="userDetails">
      <form className="userForm">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ marginRight: "0.5rem" }}>Account </h1>
          <h1 style={{ color: "var(--primary)" }}> Details</h1>
        </div>
        <div>
          <p className="user-detail_heading">Username</p>
          <input
            type="text"
            className="user-textbox"
            disabled={editState ? false : true}
            value={newUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p className="user-detail_heading">Email</p>
          <input
            type="email"
            className="user-textbox"
            disabled={editState ? false : true}
            value={newEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p className="user-detail_heading">Password</p>
          <input
            type="password"
            className="user-textbox"
            disabled={true}
            value={userData.password}
          />
        </div>
        <div>
          <p className="user-detail_heading">New Password</p>
          <input
            type="text"
            className="user-textbox"
            disabled={editState ? false : true}
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn-update"
          type={editState ? "submit" : "button"}
          onClick={(e) => {
            e.preventDefault();
            editState
              ? updateuserHandler(newUsername, newEmail, newPassword)
              : setEditstate(true);
          }}
        >
          {editState ? "Update" : "Edit"}
        </button>
        <button className="btn-update" onClick={logoutHandler}>
          LogOut
        </button>
      </form>
    </div>
  );
};
