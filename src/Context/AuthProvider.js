import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {API_URL} from '../Constants';

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isUserLogin, setLogin] = useState(false);

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("VideoAuthDetails"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  }, []);

  async function loginUserWithCredentials(email, password) {
    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        { email, password }
      );
      const data = response.data;
      if (data.success) {
        setLogin(true);
        localStorage.setItem(
          "VideoAuthDetails",
          JSON.stringify({
            isUserLoggedIn: true,
            id: data.id,
            icon: data.icon.toUpperCase()
          })
        );
        return { success: true };
      }
    } catch (error) {
      console.log("Sahi username password nahi pata kya?", error);
      return { success: false };
    }
  }

  async function signinUser(username, email, password) {
    try {    
      const response = await axios.post(
        `${API_URL}/user/signup`,
        {
          username,
          email,
          password,
          history: [],
          liked: [],
          watch_later: [],
          playlist: [],
        }
      );
      const data = response.data;
      if (data.success) {
        setLogin(true);
        localStorage.setItem(
          "VideoAuthDetails",
          JSON.stringify({
            isUserLoggedIn: true,
            id: data.id,
            icon: data.icon.toUpperCase()
          })
        );
        return { success: true };
      }
    } catch (error) {
      console.log("Sahi username password nahi pata kya?", error);
      return { success: false };
    }
  }

  async function updateUser(username, email, password) {
    try {
      const loginStatus = JSON.parse(localStorage.getItem("VideoAuthDetails"));
      const token = loginStatus.id;
      const response = await axios.post(
        `${API_URL}/user/updateuser`,
        {
          username,
          email,
          password,
        },
        {
          headers: { authorization: token },
        }
      );
      const data = response.data;
      if (data.success) {
        setLogin(true);
        return { success: true };
      }
    } catch (error) {
      console.log("Sahi username password nahi pata kya?", error);
      return { success: false };
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
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
