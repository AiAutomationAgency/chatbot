import React from "react";
import "../assets/css/chat.css";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { IconButton } from "@mui/material";

const BotMessage = ({ msg }) => {
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  }
  return (
    <div className="cc-lmc-bot-container">
      <div className="cc-lmc-bc-body">
        <p>{msg.message_content}</p>
        <div className="cc-lmc-bc-actions">
          <div className="cc-lmc-bc-actions-left">
            <div className="cc-lmc-bc-actions-icon-holder">
              <IconButton
                onClick={(e) => {
                  copyToClipboard(msg.message_content);
                }}
              >
                <ContentCopyOutlinedIcon
                  sx={{ fontSize: 18, color: "white" }}
                />
              </IconButton>
            </div>
            <div className="cc-lmc-bc-actions-icon-holder">
              <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
            <div className="cc-lmc-bc-actions-icon-holder">
              <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
          </div>
          <div className="cc-lmc-bc-actions-right">2 hours ago</div>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
