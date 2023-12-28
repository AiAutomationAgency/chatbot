import React, { useEffect, useState } from "react";
import "../assets/css/chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversationId,
  setConversation,
} from "../features/messages/messagesSlice";

const HistoryListItem = ({
  item = { conversation_id: 8, project_name: "hahahahahah" },
}) => {
  // const [active,setActive] = useState(false);
  const dispatch = useDispatch();
  const selectedConversationId = useSelector(selectCurrentConversationId);
  const [active, setActive] = useState(false);
  const ClickHandler = (e) => {
    const allListItems = document.querySelectorAll(".cc-rh-item");
    allListItems.forEach((item) => {
      return item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    dispatch(setConversation(item.conversation_id));
  };
  useEffect(() => {
    if (selectedConversationId === item.conversation_id) {
      setActive(true);
    }
  }, [selectedConversationId, item]);
  return (
    <li
      onClick={ClickHandler}
      className={active ? "cc-rh-item active" : "cc-rh-item"}
    >
      <div className="cc-rh-item-title">
        {item.project_name + item.conversation_id}
      </div>
      <div className="cc-rh-item-desc">
        {"has anyone before beated stockfish in chess".substring(0, 34) + "..."}
      </div>
    </li>
  );
};

export default HistoryListItem;
