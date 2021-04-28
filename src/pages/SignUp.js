import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthProvider'
const SignUp = () => {
    const navigate = useNavigate();
    const [showpasswordState, setPassState] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { signinUser } = useAuth()
    const [password, setPassword] = useState('');
    async function signHandler(e, username, email, password) {
        e.preventDefault()
        const response = await signinUser(username, email, password)
        if (response.success) {
            navigate("/");
        }
        else {
            setUsername('')
            setPassword('')
            setEmail('')
        }
    }
    return (
        <div className="Login-container">
            <form className="Login-box" onSubmit={(e) => signHandler(e, username, email, password)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Sign </h1>
                    <h1 style={{ color: "var(--primary)" }}>UP</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" value={username} required placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="email" value={email} required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} required placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        <FontAwesomeIcon icon={showpasswordState ? faEye : faEyeSlash} />
                    </div>
                </div>
                <button type="submit" className="signup-click-btn"
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
