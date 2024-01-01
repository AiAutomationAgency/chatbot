import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import App from "../App";
import Loading from "./Loading";

const AnimatedRoutes = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading

    return () => clearTimeout(timer);
  }, []);

  const isLoadingPage = location.pathname === "/login";

  if (isLoading && !isLoadingPage) {
    return <Loading />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
