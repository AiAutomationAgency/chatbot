import React from "react";
import "../assets/css/button-nav.css";
import { Button } from "@mui/material";
const ButtonNav = ({ Comp, text, onClick = () => {} }) => {
  return (
    <Button variant="outlined" className="button-nav-btn" onClick={onClick}>
      <Comp className="button-nav-btn-icon" />
      <span className="button-nav-btn-text">{text}</span>
    </Button>
  );
};

export default ButtonNav;
