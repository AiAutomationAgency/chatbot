import React from "react";
import "../assets/css/task.css";
import { IconButton } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const AttachementTask = ({ Icon, filename = "This file name is-true.pdf" }) => {
  return (
    <div className="attachement-task-container">
      <div className="attachement-task-left">
        <Icon style={{ color: "#d0d0d0" }} />
        <p>{filename}</p>
      </div>
      <div className="attachement-task-right">
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

export default AttachementTask;
