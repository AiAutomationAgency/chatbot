import React, { useCallback, useEffect } from "react";
import "../assets/css/chatbot.css";
import logo from "../assets/images/logo .png";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import { IconButton } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { apiSlice } from "../app/api/apiSlice";
import {
  selectCurrentOpen,
  toggleOpen,
} from "../features/sidebar/SidebarSlice";
import { useTranslation } from "react-i18next";

const Chatbot = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isOpen = useSelector(selectCurrentOpen);
  const sidebarTrigger = useCallback(
    () => dispatch(toggleOpen(!isOpen)),
    [dispatch, isOpen]
  );
  // const isMatch = useMediaQuery("(max-width:720px)")
  // useEffect(()=>{
  //   if (isMatch) {
  //     sidebarTrigger()
  //   }
  // },[isMatch])
  useEffect(() => {
    const sidebar = document.querySelector(".cbc-main-sidebar");
    const main = document.querySelector(".cbc-main");
    if (!isOpen) {
      sidebar.classList.add("op-0");
      setTimeout(() => {
        sidebar.classList.add("w-0");
        main.classList.add("no-sb");
      }, 100);
    } else {
      sidebar.classList.remove("w-0");
      main.classList.remove("no-sb");
      setTimeout(() => {
        sidebar.classList.remove("op-0");
      }, 100);
    }
  }, [isOpen]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const allListItems = document.querySelectorAll(".cbc-msb-tb-item");
    allListItems.forEach((item) => {
      return item.classList.remove("active");
    });

    if (location.pathname.split("/")[1] === "projects") {
      document
        .querySelector(".cbc-msb-tb-item.projects")
        .classList.add("active");
    } else if (location.pathname.split("/")[1] === "library") {
      document
        .querySelector(".cbc-msb-tb-item.library")
        .classList.add("active");
    } else if (location.pathname.split("/")[1] === "chatbot") {
      document
        .querySelector(".cbc-msb-tb-item.chatbot")
        .classList.add("active");
    } else if (location.pathname.split("/")[1] === "settings") {
      document
        .querySelector(".cbc-msb-tb-item.settings")
        .classList.add("active");
    } else if (location.pathname.split("/")[1] === "statistics") {
      document
        .querySelector(".cbc-msb-tb-item.statistics")
        .classList.add("active");
    }
  }, [location]);
  useEffect(() => {
    if (!isOpen) {
      const allListItems = document.querySelectorAll(".cbc-msb-tt-icon.abs");
      allListItems.forEach((item) => {
        return item.classList.remove("active");
      });

      if (location.pathname.split("/")[1] === "projects") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.projects")
          .classList.add("active");
      } else if (location.pathname.split("/")[1] === "library") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.library")
          .classList.add("active");
      } else if (location.pathname.split("/")[1] === "chatbot") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.chatbot")
          .classList.add("active");
      } else if (location.pathname.split("/")[1] === "settings") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.settings")
          .classList.add("active");
      } else if (location.pathname.split("/")[1] === "statistics") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.statistics")
          .classList.add("active");
      } else if (location.pathname.split("/")[1] === "tasks") {
        document
          .querySelector(".cbc-msb-tt-icon.abs.tasks")
          .classList.add("active");
      }
    }
  }, [location, isOpen]);
  const ClickHandler = (e) => {
    if (e.target.classList.contains("chatbot")) {
      navigate("/chatbot");
    } else if (e.target.classList.contains("projects")) {
      navigate("/projects");
    } else if (e.target.classList.contains("library")) {
      navigate("/library");
    } else if (e.target.classList.contains("settings")) {
      navigate("/settings");
    } else if (e.target.classList.contains("statistics")) {
      navigate("/statistics");
    } else if (e.target.classList.contains("tasks")) {
      navigate("/tasks");
    }
  };
  const ClickHandlerResponsive = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("chatbot")) {
      navigate("/chatbot");
    } else if (
      e.target.classList.contains("projects") ||
      e.target.parentNode.classList.contains("projects")
    ) {
      navigate("/projects");
    } else if (
      e.target.classList.contains("library") ||
      e.target.parentNode.classList.contains("library")
    ) {
      navigate("/library");
    } else if (
      e.target.classList.contains("settings") ||
      e.target.parentNode.classList.contains("settings")
    ) {
      navigate("/settings");
    } else if (
      e.target.classList.contains("statistics") ||
      e.target.parentNode.classList.contains("statistics")
    ) {
      navigate("/statistics");
    } else if (
      e.target.classList.contains("tasks") ||
      e.target.parentNode.classList.contains("tasks")
    ) {
      navigate("/tasks");
    } else {
      return;
    }
  };

  return (
    <div className="chat-bot-container">
      <div className="cbc-main">
        <div
          className="cbc-responsive-sidebar"
          style={{
            display: isOpen ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={sidebarTrigger}>
            <AutoAwesomeMosaicIcon className="cbc-msb-tt-icon abs" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="chatbot responsive"
          >
            <ChatBubbleOutlineIcon className="cbc-msb-tt-icon abs chatbot" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="library responsive"
          >
            <DescriptionOutlinedIcon className="cbc-msb-tt-icon abs library" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="projects responsive"
          >
            <BorderAllRoundedIcon className="cbc-msb-tt-icon abs projects" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="statistics responsive"
          >
            <InsertChartOutlinedRoundedIcon className="cbc-msb-tt-icon abs statistics" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="settings responsive"
          >
            <SettingsOutlinedIcon className="cbc-msb-tt-icon abs settings" />
          </IconButton>
          <IconButton
            onClick={ClickHandlerResponsive}
            className="tasks responsive"
          >
            <HelpCenterOutlinedIcon className="cbc-msb-tt-icon abs tasks" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(logOut());
              dispatch(apiSlice.util.resetApiState());
            }}
          >
            <LogoutIcon className="cbc-msb-tt-icon abs" />
          </IconButton>
        </div>
        <div className="cbc-main-sidebar">
          <div className="cbc-msb-top">
            <div className="cbc-msb-top-top">
              <img
                src={logo}
                alt=""
                onClick={() => {
                  navigate("/login");
                }}
                className="cbc-msb-tt-logo"
              />
              <IconButton onClick={sidebarTrigger}>
                <AutoAwesomeMosaicIcon className="cbc-msb-tt-icon" />
              </IconButton>
            </div>
            <ul className="cbc-msb-top-bottom chatHelper">
              <li onClick={ClickHandler} className="cbc-msb-tb-item chatbot">
                <IconButton>
                  <ChatBubbleOutlineIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("AI Chat Helper")}
              </li>
              <li onClick={ClickHandler} className="cbc-msb-tb-item library">
                <IconButton>
                  <DescriptionOutlinedIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("Library")}
              </li>
              <li onClick={ClickHandler} className="cbc-msb-tb-item projects">
                <IconButton>
                  <BorderAllRoundedIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("My Projects")}
              </li>
              <li onClick={ClickHandler} className="cbc-msb-tb-item statistics">
                <IconButton>
                  <InsertChartOutlinedRoundedIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("Statistics")}
              </li>
              <li onClick={ClickHandler} className="cbc-msb-tb-item settings">
                <IconButton>
                  <SettingsOutlinedIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("Settings")}
              </li>
              <li onClick={ClickHandler} className="cbc-msb-tb-item tasks">
                <IconButton>
                  <HelpCenterOutlinedIcon className="cbc-msb-tt-icon" />
                </IconButton>
                {t("Tasks")}
              </li>
            </ul>
          </div>
          <div className="cbc-msb-bottom">
            <div
              className="cbc-msb-bottom-bottom"
              onClick={() => {
                dispatch(logOut());
                dispatch(apiSlice.util.resetApiState());
              }}
            >
              <p>{t("Logout")}</p>
              <IconButton>
                <LogoutIcon className="cbc-msb-tt-icon" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="cbc-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
