import React from "react";
import Login from "../pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";

const NoneAnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default NoneAnimatedRoutes;
