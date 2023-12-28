import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
const TaskItem = ({ title, progress = "50%", due, taskId }) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "tasks-container-left-content-row-waterfall-item-card " + `${taskId}`
      }
      draggable={true}
      onClick={() => {
        navigate(`/task/${taskId}`);
      }}
    >
      <div className="waterfall-item-card-top-button">
        <KeyboardArrowDownIcon />
      </div>
      <div className="waterfall-item-card-body">
        <h1 className="waterfall-item-card-body-task-title">{title}</h1>
        <div className="waterfall-item-card-body-task-progress">
          <span>Progress</span>
          <span>{progress}</span>
        </div>
        <div className="waterfall-item-card-body-task-progress-bar"></div>
      </div>
      <div className="waterfall-item-card-footer">
        <div className="waterfall-item-card-footer-left">
          <AccessTimeIcon />
          <AttachFileIcon />
          <ChatBubbleOutlineIcon />
        </div>
        <div className="waterfall-item-card-footer-right">
          <span>{due}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
