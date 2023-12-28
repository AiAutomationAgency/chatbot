import React from "react";
import "../assets/css/task.css";
import img from "../assets/images/user.png";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { IconButton } from "@mui/material";
const TaskComment = ({
  comment = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque corporis obcaecati alias non aliquid aut ex numquam porro ipsam, delectus tenetur molestiae beatae reprehenderit eligendi.",
}) => {
  return (
    <div className="task-comment-container">
      <div className="task-comment-user">
        <img src={img} alt="" className="task-comment-user-img" />
        <p className="task-comment-user-name">TAHA Bourichi</p>
        <span className="task-comment-user-time-ago">2h ago</span>
      </div>
      <div className="task-comment-comment">{comment}</div>
      <div className="task-comment-actions">
        <IconButton>
          <SentimentSatisfiedAltIcon style={{ color: "#a8a8a8" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskComment;
