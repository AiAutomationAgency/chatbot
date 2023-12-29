import React, { useEffect, useState } from "react";
import "../assets/css/tasks.css";
import ButtonNav from "./ButtonNav";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WaterfallItem from "./WaterfallItem";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import img from "../assets/images/user.png";
import {
  useFetchUserTasksQuery,
  useUpdateTaskMutation,
} from "../features/tasks/TaskApiSlice";
const Tasks = () => {
  const { t } = useTranslation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const usersList = ["TAHA Bourichi", "TAHA Farija", "ALI Mesbahi"];
  const projectsList = ["P1", "P2", "P3", "P4", "P5"];

  const { data, isLoading } = useFetchUserTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    const taskUpdater = async (status, taskId) => {
      const res = await updateTask({
        data: { status },
        task_id: taskId,
      }).unwrap();
      return res;
    };
    if (taskId > -1 && status !== "") {
      setTimeout(() => {
        taskUpdater(status, taskId);
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    }
  }, [taskId, status, updateTask, data]);
  useEffect(() => {
    const containers = document.querySelectorAll(
      ".tasks-container-left-content-row-waterfall-item"
    );
    const draggables = document.querySelectorAll(
      ".tasks-container-left-content-row-waterfall-item-card"
    );
    draggables.forEach((draggableItem) => {
      draggableItem.addEventListener("dragstart", (e) => {
        return draggableItem.classList.add("dragging");
      });
    });
    draggables.forEach((draggableItem) => {
      draggableItem.addEventListener("dragend", async (e) => {
        if (draggableItem) {
          return draggableItem.classList.remove("dragging");
        }
      });
    });
    containers.forEach((containerItem) => {
      containerItem.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(containerItem, e.clientY);
        const dragItem = document.querySelector(".dragging");
        if (afterElement == null) {
          containerItem.appendChild(dragItem);
        } else {
          containerItem.insertBefore(dragItem, afterElement);
        }
        setTaskId(dragItem.classList[1]);
        if (containerItem.id === "0") {
          setStatus("New-Task");
        } else if (containerItem.id === "1") {
          setStatus("In-Progress");
        } else if (containerItem.id === "2") {
          setStatus("Under-Review");
        } else if (containerItem.id === "3") {
          setStatus("Testing");
        } else if (containerItem.id === "4") {
          setStatus("Completed");
        }
      });
    });
    function getDragAfterElement(container, y) {
      const dragabblesElements = [
        ...container.querySelectorAll(
          ".tasks-container-left-content-row-waterfall-item-card:not(.dragging)"
        ),
      ];
      return dragabblesElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY, element: null }
      ).element;
    }
  }, [isLoading]);
  const renderUi = () => {
    let content;
    if (isLoading) {
      content = (
        <div className="tasks-container">
          <div className="tasks-container-left">
            <div className="tasks-container-left-header">
              <div className="tasks-container-left-header-left">
                Tasks Manager
              </div>
              <div className="tasks-container-left-header-right">
                <ButtonNav
                  Comp={AddCircleOutlineIcon}
                  text={t("add")}
                  onClick={() => {
                    setIsCreateOpen((prev) => !prev);
                  }}
                />
                <ButtonNav Comp={DatasetOutlinedIcon} text={t("Library")} />
              </div>
            </div>
            <div
              className="tasks-container-left-content"
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
        <div className="tasks-container">
          <div className="tasks-container-left">
            <div className="tasks-container-left-header">
              <div className="tasks-container-left-header-left">
                Tasks Manager
              </div>
              <div className="tasks-container-left-header-right">
                <ButtonNav
                  Comp={AddCircleOutlineIcon}
                  text={t("add")}
                  onClick={() => {
                    setIsCreateOpen((prev) => !prev);
                  }}
                />
                <ButtonNav Comp={DatasetOutlinedIcon} text={t("Library")} />
              </div>
            </div>
            <div className="tasks-container-left-content">
              <div className="tasks-container-left-content-row">
                filters by date // all tasks or my tasks
              </div>
              <div className="tasks-container-left-content-row-waterfall">
                <WaterfallItem data={data["New-Task"]} id={0} />
                <WaterfallItem
                  text="In Progress"
                  data={data["In-Progress"]}
                  id={1}
                />
                <WaterfallItem
                  text="Under Review"
                  data={data["Under-Review"]}
                  id={2}
                />
                <WaterfallItem text="Testing" data={data["Testing"]} id={3} />
                <WaterfallItem
                  text="Completed"
                  data={data["Completed"]}
                  id={4}
                />
              </div>
            </div>
          </div>
          <div
            className={
              isCreateOpen
                ? "tasks-container-right"
                : "tasks-container-right closed"
            }
          >
            <div className="tasks-container-right-header">
              New Task
              <ButtonNav Comp={CloseIcon} text={t("Close")} />
            </div>
            <div className="tasks-container-right-content">
              <TextField type="text" label="Task title" />
              <Autocomplete
                disablePortal
                options={projectsList}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Projects" />
                )}
              />
              <TextField
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Task Due Date"
              />
              <Autocomplete
                options={usersList}
                autoHighlight
                fullWidth
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img loading="lazy" width="20" src={img} alt="" />
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsCreateOpen((prev) => !prev);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return content;
  };
  return renderUi();
};

export default Tasks;
