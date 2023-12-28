import React from "react";
import "../assets/css/task.css";
import ButtonNav from "./ButtonNav";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ArticleIcon from "@mui/icons-material/Article";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CloseIcon from "@mui/icons-material/Close";
import Subtask from "./Subtask";
import LabelTask from "./LabelTask";
import AttachementTask from "./AttachementTask";
import TaskComment from "./TaskComment";
import TaskCommentInput from "./TaskCommentInput";
import { useFetchTaskByIdQuery } from "../features/tasks/TaskApiSlice";
import { CircularProgress } from "@mui/material";
const Task = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const taskId = useParams().taskId;
  const { data, isLoading } = useFetchTaskByIdQuery(taskId);
  let content;
  if (isLoading) {
    content = (
      <div className="task-container">
        <div className="task-container-left">
          <div className="task-container-left-header">
            <div className="task-container-left-header-left">Task Details</div>
            <div className="task-container-left-header-right">
              <ButtonNav
                Comp={AddCircleOutlineIcon}
                text={t("add")}
                onClick={() => {}}
              />
              <ButtonNav
                Comp={DatasetOutlinedIcon}
                text={t("Library")}
                onClick={() => {}}
              />
            </div>
          </div>
          <div
            className="task-container-left-content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </div>
        <div className="task-container-right">
          <div className={"task-container-right-header"}>
            <span>Details</span>
            <ButtonNav Comp={CloseIcon} text={t("Close")} />
          </div>
          <div
            className="task-container-right-content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="task-container">
        <div className="task-container-left">
          <div className="task-container-left-header">
            <div className="task-container-left-header-left">Task Details</div>
            <div className="task-container-left-header-right">
              <ButtonNav
                Comp={AddCircleOutlineIcon}
                text={t("add")}
                onClick={() => {}}
              />
              <ButtonNav
                Comp={DatasetOutlinedIcon}
                text={t("Library")}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="task-container-left-content">
            <div className="task-container-left-content-row-top">
              <h3 className="task-container-left-content-row-title">
                {data.title}
              </h3>
              <div className="task-container-left-content-row-actions">
                <ButtonNav
                  Comp={AttachFileIcon}
                  text={"Attach"}
                  onClick={() => {}}
                />
                <ButtonNav
                  Comp={NoteAddIcon}
                  text={"Add Note"}
                  onClick={() => {}}
                />
                <ButtonNav
                  Comp={BookmarksIcon}
                  text={"Add Label"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <h5 className="task-container-left-content-subtitle">Subtasks</h5>
            <div className="task-container-left-content-row">
              {data.subtasks.map((subtask, index) => {
                return <Subtask key={index} text={subtask.title} />;
              })}
            </div>
            <h5 className="task-container-left-content-subtitle">Labels</h5>
            <div className="task-container-left-content-row-labels">
              {data.labels.map((label, index) => {
                return (
                  <LabelTask key={index} label={label.name} color="pink" />
                );
              })}
            </div>
            <h5 className="task-container-left-content-subtitle">
              Attachements
            </h5>
            <div className="task-container-left-content-row">
              {data.attachments.map((att, index) => {
                return (
                  <AttachementTask
                    key={index}
                    Icon={FilePresentIcon}
                    filename={
                      att.file.split("/")[att.file.split("/").length - 1]
                    }
                  />
                );
              })}
            </div>
            <h5 className="task-container-left-content-subtitle">
              Linked Documents
            </h5>
            <div className="task-container-left-content-row">
              {data.project.files.map((file, index) => {
                return (
                  <AttachementTask
                    key={index}
                    filename={file.file_name}
                    Icon={ArticleIcon}
                  />
                );
              })}
            </div>
            <h5 className="task-container-left-content-subtitle">Comments</h5>
            <div className="task-container-left-content-row comments">
              <TaskComment />
              <TaskComment />
              <TaskComment />
              <TaskComment />
              <TaskCommentInput />
            </div>
          </div>
        </div>
        <div className="task-container-right">
          <div className={"task-container-right-header"}>
            <span>Details</span>
            <ButtonNav Comp={CloseIcon} text={t("Close")} />
          </div>
          <div className="task-container-right-content">
            <h5 className="task-container-left-content-subtitle">
              Parent Project:
            </h5>
            <div className="parent-project-container">
              {data.project.project_name}
            </div>
            <h5 className="task-container-left-content-subtitle">Assigner:</h5>
            <div className="parent-project-container">
              {data.created_by.username}
            </div>
            <h5 className="task-container-left-content-subtitle">Assignee:</h5>
            <div className="parent-project-container">
              {data.assigned_users[0].username}
            </div>
            <h5 className="task-container-left-content-subtitle">Due Date:</h5>
            <div className="parent-project-container">
              {data.due_date.split("T")[0]}
            </div>
            <h5 className="task-container-left-content-subtitle">
              Created Date:
            </h5>
            <div className="parent-project-container">
              {data.creation_date.split("T")[0]}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default Task;
