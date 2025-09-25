import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPaths from "../authRoutes/AuthPaths";
import PublicPaths from "../publicPath/PublicPaths";
import PrivatePaths from "../privatePaths/PrivatePaths";
import { RouteItem } from "../types";
import PrivateRoute from "../privatePaths/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { checkAuth } from "../../redux/authSlice/authSlice";
import { AppDispatch } from "../../redux/store";

const RoutesHOC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <Routes>
          {/* Auth Routes */}
          {AuthPaths.map((route: RouteItem) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Content />}
            />
          ))}

          {/* Public Routes */}
          {PublicPaths.map((route: RouteItem) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Content />}
            />
          ))}

          {/* Private Routes */}
          {PrivatePaths.map((route: RouteItem) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.Content />
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default RoutesHOC;
