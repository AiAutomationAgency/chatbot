import React, { useEffect, useRef, useState } from "react";
import "../assets/css/chat.css";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HistoryListItem from "./HistoryListItem";
import { useSelector } from "react-redux";
import { useGetAllQuery } from "../features/history/historyApiSlice";
import {
  useGetAllMessagesQuery,
  useSendMessageMutation,
  useSummarizeMutation,
} from "../features/messages/messagesApiSlice";
import {
  selectCurrentConversationId,
  selectCurrentSummary,
} from "../features/messages/messagesSlice";
import { selectCurrentSelectedFiles } from "../features/files/filesSlice";
import { useParams } from "react-router-dom";
import { useFetchProjectByIdQuery } from "../features/projects/ProjectApiSlice";
import ButtonNav from "./ButtonNav";
import BadgeWithName from "./BadgeWithName";
import PageTransition from "./PageTransition";
import { useTranslation } from "react-i18next";
const Chat = () => {
  const { t } = useTranslation();
  const projectId = useParams().projectId;
  const { data: project, isSuccess } = useFetchProjectByIdQuery(projectId);
  const selectedConversationId = useSelector(selectCurrentConversationId);
  const { data: history, isLoading } = useGetAllQuery();
  const {
    data: messages,
    isError,
    refetch,
  } = useGetAllMessagesQuery(selectedConversationId);
  const [sendMessage] = useSendMessageMutation();
  const [instantMessages, setInstantMessages] = useState([]);
  const summary = useSelector(selectCurrentSummary);
  const [summarize] = useSummarizeMutation();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setIsDialog(true);
  };
  useEffect(() => {
    const refetcher = async () => {
      await refetch(selectedConversationId);
    };
    if (selectedConversationId) {
      refetcher();
    }
  }, [selectedConversationId, refetch]);
  useEffect(() => {
    if (!isError && messages) {
      setInstantMessages(messages);
    }
  }, [isError, messages]);
  useEffect(() => {
    if (summary !== "") {
      setInstantMessages((prev) => [
        ...prev,
        { response: summary, sender: "bot" },
      ]);
    }
  }, [summary]);

  const sendMessageUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    let obj;
    if (selectedConversationId !== null) {
      obj = {
        user_input: userInput,
        conv: selectedConversationId,
        project_id: projectId,
      };
    } else {
      obj = {
        user_input: userInput,
        project_id: projectId,
      };
    }
    setUserInput("");
    setInstantMessages((prev) => [
      ...prev,
      { message_content: userInput, sender: "user" },
    ]);
    try {
      await sendMessage(obj);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".cc-right-header");
    const body = document.querySelector(".cc-right-history");
    const footer = document.querySelector(".cc-right-footer");
    if (open) {
      setTimeout(() => {
        header?.classList.remove("closed");
        body?.classList.remove("closed");
        footer?.classList.remove("closed");
      }, 200);
    } else {
      setTimeout(() => {
        header?.classList.add("closed");
        body?.classList.add("closed");
        footer?.classList.add("closed");
      }, 100);
    }
  }, [open]);
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
  //dialogue sumary
  const [isDialog, setIsDialog] = useState(false);
  const [isDialogAdded, setIsDialogAdded] = useState(false);
  const [selectedFileSumm, setSelectedFileSumm] = useState("");
  const selectedFiles = useSelector(selectCurrentSelectedFiles);
  const handleCloseDialog = (bool) => {
    setIsDialog(false);
    setIsDialogAdded(bool);
  };

  useEffect(() => {
    const get_summary = async () => {
      try {
        await summarize(selectedFileSumm);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (isDialogAdded) {
      setLoading(true);
      get_summary();
    }
  }, [isDialogAdded, summarize, selectedFileSumm]);
  let content;

  if (isLoading && !isSuccess) {
    content = (
      <div className="chat-container">
        <div className="cc-left">
          <div className="cc-left-header">
            <div className="cc-lh-left">
              {t("Loading")}
              <div className="typingDots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {/* get project Name by id */}
            <div className="cc-lh-right">
              <ButtonNav
                Comp={HistoryIcon}
                text={t("History")}
                onClick={(e) => {
                  setOpen((prev) => !prev);
                }}
              />
              <ButtonNav
                Comp={UploadFileOutlinedIcon}
                text={t("Upload")}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="cc-left-messages-container">
            <CircularProgress />
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
                if (selectedFiles?.length !== 0) {
                  setUserInput(e.target.value);
                }
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
        <PageTransition />
      </div>
    );
  } else {
    content = (
      <div className="chat-container">
        <div className="cc-left">
          <div className="cc-left-header">
            <div className="cc-lh-left">
              {project?.project_name}/{selectedConversationId}
            </div>
            {/* get project Name by id */}
            <div className="cc-lh-right">
              <ButtonNav
                Comp={HistoryIcon}
                text={t("History")}
                onClick={(e) => {
                  setOpen((prev) => !prev);
                }}
              />
              <ButtonNav
                Comp={UploadFileOutlinedIcon}
                text={t("Upload")}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="cc-left-messages-container">
            {instantMessages.map((msg, index) => {
              if (msg.sender === "bot") {
                return <BotMessage msg={msg} key={index} />;
              }
              return <UserMessage msg={msg} key={index} />;
            })}
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
                if (selectedFiles?.length !== 0) {
                  setUserInput(e.target.value);
                }
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
        <div className={open ? "cc-right" : "cc-right closed"}>
          <div className={open ? "cc-right-header" : "cc-right-header closed"}>
            <BadgeWithName
              name={t("History")}
              length={history && history?.length}
            />
            <ButtonNav
              text={t("Close")}
              Comp={CloseIcon}
              onClick={(e) => {
                setOpen((prev) => !prev);
              }}
            />
          </div>
          <ul className={open ? "cc-right-history" : "cc-right-history closed"}>
            {history &&
              history?.map((item, index) => {
                return <HistoryListItem key={index} item={item} />;
              })}
            {/* <HistoryListItem /> */}
          </ul>
          <div className={open ? "cc-right-footer" : "cc-right-footer closed"}>
            <button className="cc-rf-button">
              <DeleteOutlineIcon />
              {t("Clear History")}
            </button>
          </div>
        </div>
        <Dialog open={isDialog} onClose={handleCloseDialog}>
          <DialogTitle>{t("Select a File for summarization")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("Please shoose from below")}
            </DialogContentText>
            <Select
              value={selectedFileSumm}
              fullWidth
              label={t("Files")}
              onChange={(e) => setSelectedFileSumm(e.target.value)}
            >
              <MenuItem value="">
                <em>{t("None")}</em>
              </MenuItem>
              {selectedFiles.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseDialog(false)} color="primary">
              {t("Cancel")}
            </Button>
            <Button onClick={() => handleCloseDialog(true)} color="primary">
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return content;
};

export default Chat;
