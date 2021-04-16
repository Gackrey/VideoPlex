import React, { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    // const navigate = useNavigate();
    const [isUserLogin, setLogin] = useState(false);
    useEffect(() => {
        const loginStatus = JSON.parse(localStorage?.getItem("VideoAuthDetails"));
        loginStatus?.isUserLoggedIn && setLogin(true);
    }, []);

    // async function loginUserWithCredentials(username, password) {
    //     try {
    //         const response = await fakeAuthApiLogin(username, password);
    //         if (response.success) {
    //             setLogin(true);
    //             localStorage.setItem(
    //                 "VideoAuthDetails",
    //                 JSON.stringify({ isUserLoggedIn: true })
    //             );
    //             navigate("/");
    //         }
    //     } catch (error) {
    //         console.log("Sahi username password nahi pata kya?", error);
    //     }
    // }

    // async function signinUser(username, email, password) {
    //     try {
    //         const response = await fakeAuthApiSignUp(username, email, password)
    //         if (response.success) {
    //             setLogin(true);
    //             localStorage.setItem(
    //                 "VideoAuthDetails",
    //                 JSON.stringify({isUserLoggedIn: true })
    //             );
    //             navigate("/");
    //         }
    //     } catch (error) {
    //         console.log("Sahi username password nahi pata kya?", error);
    //     }
    // }
    // function LogOut() {
    //     setLogin(false);
    //     localStorage.removeItem("VideoAuthDetails");
    // }
    return (
        <AuthContext.Provider
            value={{
                isUserLogin,
                // loginUserWithCredentials,
                // signinUser,
                // LogOut
            }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext)
}