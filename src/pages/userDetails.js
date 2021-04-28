import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider'
const UserDetails = () => {
    const navigate = useNavigate();
    const { LogOut, updateUser } = useAuth()
    const localUser = JSON.parse(localStorage.getItem('VideoAuthDetails'))
    const data = localUser.data;
    const [editState, setEditstate] = useState(false);
    const [newUsername, setUsername] = useState(data.name);
    const [newEmail, setEmail] = useState(data.email);
    const [newPassword, setPassword] = useState('');
    async function updateuserHandler(newUsername, newEmail, newPassword) {
        const response = await updateUser(data.name, data.password, newUsername, newEmail, newPassword)
        if (response.success)
            setEditstate(false)
    }
    function logoutHandler() {
        LogOut()
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
                    <p style={{ fontWeight:"bold", fontSize: "22px", margin: "5px 0" }}>Username</p>
                    <input type="text" className="user-textbox" disabled={editState ? false : true}
                        value={newUsername}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <p style={{ fontWeight:"bold",fontSize: "22px", margin: "5px 0" }}>Email</p>
                    <input type="email" className="user-textbox" disabled={editState ? false : true}
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <p style={{ fontWeight:"bold",fontSize: "22px", margin: "5px 0" }}>Password</p>
                    <input type="password" className="user-textbox" disabled={true}
                        value={data.password} />
                </div>
                <div>
                    <p style={{ fontWeight:"bold",fontSize: "22px", margin: "5px 0" }}>New Password</p>
                    <input type="text" className="user-textbox" disabled={editState ? false : true}
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn-update" type={editState ? "submit" : "button"}
                    onClick={(e) => {
                        e.preventDefault()
                        editState ? updateuserHandler(newUsername, newEmail, newPassword) : setEditstate(true)
                    }}
                >
                    {editState ? "Update" : "Edit"}
                </button>
                <button className="btn-update" onClick={logoutHandler}>LogOut</button>
            </form>
        </div>
    );
}

export default UserDetails;
