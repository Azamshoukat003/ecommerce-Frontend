import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CircularProgress from "@mui/material/CircularProgress";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loading = useSelector((state: RootState) => state.auth.loading);

  console.log(isLoggedIn, "isLoggeIn");
  return loading ? (
    <CircularProgress color="primary" />
  ) : isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
