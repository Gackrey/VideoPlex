import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthProvider'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUserWithCredentials } = useAuth()
    const [showpasswordState, setPassState] = useState(false)
    const [errorState, setErrorState] = useState(false);
    async function loginHandler(e, email, password) {
        e.preventDefault()
        const response = await loginUserWithCredentials(email, password)
        if (response.success) {
            navigate("/");
        }
        else {
            setEmail('')
            setPassword('')
            setErrorState(true);
        }
    }
    return (
        <div className="Login-container">
            <form className="Login-box" onSubmit={(e) => loginHandler(e, email, password)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Log </h1>
                    <h1 style={{ color: "var(--primary)" }}>IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" required placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
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
                <button type="submit" className="login-click-btn"
                >Log In</button>
                <p style={{ fontWeight: "bold" }}>Dont have a account?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up</Link>
                </p>
                {errorState ? "" : <br />}
                <p style={{
                    display: errorState ? "block" : "none",
                    color: "red",
                    fontWeight: "bold",
                    padding: "5px 0"
                }}>Wrong email or password entered</p>
            </form>
        </div>
    );
}

export default Login;
