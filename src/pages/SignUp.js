import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const SignUp = () => {
    const [showpasswordState, setPassState] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="Login-container">
            <form className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Sign </h1>
                    <h1 style={{ color: "var(--primary)" }}>UP</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" required placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} required placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        <FontAwesomeIcon icon={showpasswordState ? faEye : faEyeSlash} />
                    </div>
                </div>
                <button type="submit" className="signup-click-btn"
                // onClick={() => signinUser(username, email, password)}
                >Sign Up</button>
                <p style={{ fontWeight: "bold" }}>Already a member?
                <Link to="/login" style={{ textDecoration: "none" }}>
                        Log In</Link>
                </p>
                <br />
            </form>
        </div>
    );
}

export default SignUp;
