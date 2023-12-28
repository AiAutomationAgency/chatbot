import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../assets/css/task.css";
import { IconButton } from "@mui/material";
const LabelTask = ({ label, color = "crimson" }) => {
  return (
    <div className="label-task-container" style={{ background: color }}>
      <div className="task-label-delete">
        <IconButton>
          <HighlightOffIcon style={{ color: "RGB(220, 53, 69)" }} />
        </IconButton>{" "}
      </div>
      {label}
    </div>
  );
};

export default LabelTask;
