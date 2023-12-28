import React from "react";
import "../assets/css/task.css";
import ButtonNav from "./ButtonNav";
import { useNavigate } from "react-router-dom";
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
const TaskCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="task-container">
      <div className="task-container-left">
        <div className="task-container-left-header">
          <div className="task-container-left-header-left">Task Details</div>
          <div className="task-container-left-header-right">
            <ButtonNav
              Comp={AddCircleOutlineIcon}
              text={t("add")}
              onClick={() => navigate("/projects/create")}
            />
            <ButtonNav
              Comp={DatasetOutlinedIcon}
              text={t("Library")}
              onClick={() => navigate("/library")}
            />
          </div>
        </div>
        <div className="task-container-left-content">
          <div className="task-container-left-content-row-top">
            <h3 className="task-container-left-content-row-title">Task name</h3>
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
            <Subtask />
            <Subtask />
            <Subtask />
          </div>
          <h5 className="task-container-left-content-subtitle">Labels</h5>
          <div className="task-container-left-content-row-labels">
            <LabelTask label={"test"} color="green" />
            <LabelTask label={"test"} color="#283b97" />
            <LabelTask label={"test test test"} color="yellow" />
            <LabelTask label={"test"} color="pink" />
            <LabelTask label={"test"} color="purple" />
            <LabelTask label={"test"} color="green" />
            <LabelTask label={"test"} color="blue" />
            <LabelTask label={"test"} color="yellow" />
            <LabelTask label={"test"} color="pink" />
            <LabelTask label={"test"} color="purple" />
          </div>
          <h5 className="task-container-left-content-subtitle">Attachements</h5>
          <div className="task-container-left-content-row">
            <AttachementTask Icon={FilePresentIcon} />
            <AttachementTask Icon={FilePresentIcon} />
            <AttachementTask Icon={FilePresentIcon} />
            <AttachementTask Icon={FilePresentIcon} />
          </div>
          <h5 className="task-container-left-content-subtitle">
            Linked Documents
          </h5>
          <div className="task-container-left-content-row">
            <AttachementTask Icon={ArticleIcon} />
            <AttachementTask Icon={ArticleIcon} />
            <AttachementTask Icon={ArticleIcon} />
            <AttachementTask Icon={ArticleIcon} />
            <AttachementTask Icon={ArticleIcon} />
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
          <div className="parent-project-container">Project name and url</div>
          <h5 className="task-container-left-content-subtitle">Owner:</h5>
          <div className="parent-project-container">Taha Bourichi</div>
          <h5 className="task-container-left-content-subtitle">Assignee:</h5>
          <div className="parent-project-container">Ayman Atuume</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
