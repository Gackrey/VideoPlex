import { Route, Navigate } from "react-router-dom";
import React from "react"

export function PrivateRoute({ path, ...props }) {
  const loginStatus = JSON.parse(localStorage?.getItem("VideoAuthDetails"));
  const isUserLogin = loginStatus?.isUserLoggedIn

  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace to="/login" />
  );
}