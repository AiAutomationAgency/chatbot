import React, { useEffect, useRef, useState } from "react";
import "../assets/css/chat.css";
import { TextField } from "@mui/material";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { useSendGeneralMessageMutation } from "../features/messages/messagesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentGeneralMessages,
  setGeneralMessages,
} from "../features/messages/messagesSlice";

import CircularProgress from "@mui/material/CircularProgress";

import Dot from "./Dot";

const NormalChat = () => {
  const { t } = useTranslation();

  const generalMessages = useSelector(selectCurrentGeneralMessages);

  const [instantMessages, setInstantMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendGeneralMessage] = useSendGeneralMessageMutation();
  const dispatch = useDispatch();

  const [awaitingReply, setAwaitingReply] = useState(false);

  useEffect(() => {
    setInstantMessages(generalMessages);
  }, [generalMessages]);

  const sendMessageUser = async (e) => {
    setLoading(true);
    setAwaitingReply(true);

    e.preventDefault();

    let obj;

    obj = {
      user_input: userInput,
    };

    setUserInput("");
    setInstantMessages((prev) => [
      ...prev,
      { message_content: userInput, sender: "user" },
    ]);

    try {
      dispatch(
        setGeneralMessages({ message_content: userInput, sender: "user" })
      );

      const { data } = await sendGeneralMessage(obj);

      dispatch(
        setGeneralMessages({ message_content: data.response, sender: "bot" })
      );

      setAwaitingReply(false);
      setLoading(false);
    } catch (error) {
      setAwaitingReply(false); // In case of error, stop waiting
      setLoading(false);

      console.log(error);
    }
  };

  //Lang
  const keyHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Submit the form when the "Enter" key is pressed
      sendMessageUser(event);
    }
  };

  //auto scroll
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [instantMessages]);

  let content;

  content = (
    <div className="chat-container">
      <div className="cc-left" style={{ borderRight: "none" }}>
        <div className="cc-left-header">
          <div className="cc-lh-left">{t("AI Chat Helper")}</div>
          {/* get project Name by id */}

          {/* <div className="cc-lh-right">
            <ButtonNav Comp={HistoryIcon} text={t("History")} onClick={(e) => { setOpen(prev => !prev) }} />
            <ButtonNav Comp={UploadFileOutlinedIcon} text={t("Upload")} onClick={handleClick} />
          </div> */}
        </div>

        <div className="cc-left-messages-container">
          {instantMessages.map((msg, index) => {
            if (msg.sender === "bot") {
              return <BotMessage msg={msg} key={index} />;
            }
            return <UserMessage msg={msg} key={index} />;
          })}

          {/* {renderMessages()} */}

          {awaitingReply && (
            <div className="loading-animation">
              <div className="typingDots">
                <Dot delay={0} />
                <Dot delay={0.1} />
                <Dot delay={0.2} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="cc-left-input-container">
          <TextField
            className="cc-left-ic-input"
            variant="outlined"
            placeholder={t("Start typing")}
            multiline
            maxRows={3}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            onKeyDown={keyHandler}
          />
          <div
            className="cc-lmc-bc-actions-icon-holder input-message"
            onClick={sendMessageUser}
          >
            {!loading ? (
              <SendIcon sx={{ fontSize: 18 }} />
            ) : (
              <div className="typingDots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default NormalChat;
