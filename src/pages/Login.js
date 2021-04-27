import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showpasswordState, setPassState] = useState(false)
    return (
        <div className="Login-container">
            <form className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Log </h1>
                    <h1 style={{ color: "var(--primary)" }}>IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" required placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} required placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        <FontAwesomeIcon icon={showpasswordState ? faEye : faEyeSlash} />
                    </div>
                </div>
                <button type="submit" className="login-click-btn"
                // onClick={() => loginUserWithCredentials(username, password)}
                >Log In</button>
                <p style={{ fontWeight: "bold" }}>Dont have a account?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up</Link>
                </p>
                <br />
            </form>
        </div>
    );
}

export default Login;
