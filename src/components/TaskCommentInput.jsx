import React from "react";
import "../assets/css/task.css";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const TaskCommentInput = () => {
  const { t } = useTranslation();

  const keyHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Submit the form when the "Enter" key is pressed
      // sendMessageUser(event)
    }
  };
  return (
    <div className="task-comment-input-container">
      <IconButton>
        <SentimentSatisfiedAltIcon />
      </IconButton>
      <TextField
        className="cc-left-ic-input"
        variant="outlined"
        placeholder={t("Start typing")}
        multiline
        maxRows={3}
        onKeyDown={keyHandler}
        style={{ width: "calc(100% - 120px)" }}
      />
      <IconButton>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default TaskCommentInput;
