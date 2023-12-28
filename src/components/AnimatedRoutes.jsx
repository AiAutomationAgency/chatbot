import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import App from "../App";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
