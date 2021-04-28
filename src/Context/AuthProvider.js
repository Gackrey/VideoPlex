import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUserApi, signupUserApi,updateUserApi } from '../api/fakeAuthapi'
export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [isUserLogin, setLogin] = useState(false)

    useEffect(() => {
        const loginStatus = JSON.parse(localStorage?.getItem("VideoAuthDetails"));
        loginStatus?.isUserLoggedIn && setLogin(true);
    }, []);;

    async function loginUserWithCredentials(email, password) {
        try {
            const response = await loginUserApi(email, password);
            if (response.success) {
                setLogin(true);
                localStorage.setItem(
                    "VideoAuthDetails",
                    JSON.stringify({ isUserLoggedIn: true, data: response.data })
                );
                return { success: true }
            }
        } catch (error) {
            console.log("Sahi username password nahi pata kya?", error);
            return { success: false }
        }
    }

    async function signinUser(username, email, password) {
        try {
            const response = await signupUserApi(username, email, password)
            if (response.success) {
                setLogin(true);
                localStorage.setItem(
                    "VideoAuthDetails",
                    JSON.stringify({ isUserLoggedIn: true, data: response.data })
                );
                return { success: true }
            }
        } catch (error) {
            console.log("Sahi username password nahi pata kya?", error);
            return { success: false }
        }
    }

    async function updateUser(oldname, oldpassword,username, email, password) {
        try {
            const response = await updateUserApi(oldname, oldpassword,username, email, password)
            if (response.success) {
                setLogin(true);
                localStorage.setItem(
                    "VideoAuthDetails",
                    JSON.stringify({ isUserLoggedIn: true, data: response.data })
                );
                return { success: true }
            }
        } catch (error) {
            console.log("Sahi username password nahi pata kya?", error);
            return { success: false }
        }
    }
    function LogOut() {
        setLogin(false);
        localStorage.removeItem("VideoAuthDetails");
    }
    return (
        <AuthContext.Provider
            value={{
                isUserLogin,
                loginUserWithCredentials,
                signinUser,
                updateUser,
                LogOut
            }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext)
}