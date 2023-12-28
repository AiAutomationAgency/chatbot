import React from "react";
import "../assets/css/task.css";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
const Subtask = ({ text = "this is a sub-task for the main task." }) => {
  return (
    <div className="subtask-container">
      <div className="subtask-left">
        <Checkbox />
        <span>{text}</span>
      </div>
      <div className="subtask-right">
        <IconButton>
          <CheckBoxRoundedIcon style={{ color: "#198754" }} />
        </IconButton>
        <IconButton>
          <CancelRoundedIcon
            style={{ color: "RGB(220, 53, 69)" }}
            className="subtask-icon"
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Subtask;
