import React from "react";
import "../assets/css/chat.css";

const UserMessage = ({ msg }) => {
  return (
    <div className="cc-lmc-bot-container">
      <div className="cc-lmc-bc-body user">{msg.message_content}</div>
    </div>
  );
};

export default UserMessage;
