import React, { useEffect, useRef, useState } from "react";
import "../assets/css/project.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import FilesListItem from "./FilesListItem";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {
  useSelectFilesMutation,
  useUploadFileMutation,
} from "../features/files/filesApiSlice";
import {
  selectCurrentSelectedFiles,
  toggleShow,
} from "../features/files/filesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteProjectMutation,
  useFetchProjectByIdQuery,
} from "../features/projects/ProjectApiSlice";
import FileUploader from "./FileUploader";
import ButtonNav from "./ButtonNav";
import BadgeWithName from "./BadgeWithName";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { selectCurrentToken } from "../features/auth/authSlice";

import { VITE_WS_BASE_URL } from "../../src/app/api/BaseURL";




const Project = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("guidelines");

  const token = useSelector(selectCurrentToken);

  const project_id = useParams().projectId;

  // const { projectId: paramProjectId } = useParams();
  // const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();

  const [selectFiles] = useSelectFilesMutation();
  const [uploadFile] = useUploadFileMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const selectedFiles = useSelector(selectCurrentSelectedFiles);

  const [isUploading, setIsUploading] = useState(false);

  const [fileUploadStatus, setFileUploadStatus] = useState({});

  const [ws, setWs] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("idle");

  const shouldShowSpinner = uploadProgress === "inProgress" && type !== "plan";

  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    data: project,
    isLoading,
    refetch,
  } = useFetchProjectByIdQuery(project_id);

  const dispatch = useDispatch();

  // Keep track of the current state of uploadProgress
  const uploadProgressRef = useRef(uploadProgress);

  useEffect(() => {
    // Update ref whenever uploadProgress changes
    uploadProgressRef.current = uploadProgress;
  }, [uploadProgress]);

  useEffect(() => {
    // Initialize WebSocket connection
    const websocket = new WebSocket(`${VITE_WS_BASE_URL}/?token=${token}`);

    websocket.onopen = () => {};

    websocket.onmessage = (e) => {
      const res = JSON.parse(e.data);

      if (res?.message === "InProgress") {
        if (type === "guidelines" || type === "results") {
          setUploadProgress("inProgress");
        }
      } else if (res?.message === "Task completed") {
        setUploadProgress("completed");
        refetch();
      }
    };

    setWs(websocket);

    // Clean up WebSocket connection when component unmounts
    return () => {
      // TODO: Close WebSocket connection
      if (uploadProgressRef.current === "completed") {
        websocket.close();
      }
    };
  }, [refetch, uploadProgressRef.current]);

  // TODO:
  // useEffect(() => {
  //   if (paramProjectId) {
  //     setProjectId(paramProjectId);
  //     localStorage.setItem("projectId", paramProjectId);
  //   } else {
  //     // Retrieve projectId from local storage if not in URL
  //     const storedProjectId = localStorage.getItem("projectId");
  //     if (storedProjectId) {
  //       setProjectId(storedProjectId);
  //     } else {
  //       // Handle the case where projectId is not available
  //       console.log("Project ID is not available");
  //       navigate("/chatbot"); // Redirect to projects page or another appropriate page
  //     }
  //   }
  // }, [paramProjectId, navigate]);

  const startChatting = async (e) => {
    e.preventDefault();
    try {
      const numericProjectId = Number(project_id);

      await selectFiles({
        fileNames: selectedFiles,
        project_id: numericProjectId,
      });

      navigate(`/chatbot/${numericProjectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Start uploading

    // Set the latest file being uploaded
    if (files) {
      setFileUploadStatus((prev) => ({
        ...prev,
        [files?.name]: "uploading",
        // uploading: "uploading",
      }));

      const formData = new FormData();

      const numericProjectId = Number(project_id);

      formData.append("uploaded_file", files);
      formData.append("project_id", numericProjectId);
      formData.append("type", type);

      setFiles(null);

      try {
        await uploadFile(formData);

        if (type === "guidelines" || type === "results") {
          // Send WebSocket message for specific file types
          ws?.send(
            JSON.stringify({
              action: "fileUploaded",
              projectId: numericProjectId,
            })
          );
        }

        setFileUploadStatus((prev) => ({ ...prev, [files.name]: "uploaded" }));
      } catch (error) {
        console.error(error);
        setIsUploading(false); // End uploading whether success or error

        setFileUploadStatus((prev) => ({ ...prev, [files.name]: "failed" }));
      } finally {
        setIsUploading(false); // End uploading whether success or error
      }
    }
  };

  useEffect(() => {
    dispatch(toggleShow(true));
  }, [files, dispatch]);

  const deleteHandler = async () => {
    try {
      await deleteProject(project_id);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  const renderScores = () => {
    if (project && project.extracted_scores !== null) {
      const result = [
        <div className="banner"></div>,
        <h3 className="pci-lc-title" style={{ fontWeight: "bolder" }}>
          {t("Extracted scores:")}
        </h3>,
      ];
      const array = Object.entries(project.extracted_scores);
      if (array.length % 2 === 0) {
        for (let i = 0; i < array.length; i += 2) {
          const pair = (
            <div className="pci-lc-row">
              <div className="pci-lc-col">
                <h3
                  className="pci-lc-title"
                  style={{ fontSize: 18, color: "#333333" }}
                >
                  {array[i][0] + ":"}
                </h3>
                <p className="pci-lc-desc">{array[i][1] || t("Not Found")}</p>
              </div>
              <div className="pci-lc-col">
                <h3
                  className="pci-lc-title"
                  style={{ fontSize: 18, color: "#333333" }}
                >
                  {array[i + 1][0] + ":"}
                </h3>
                <p className="pci-lc-desc">
                  {array[i + 1][1] || t("Not Found")}
                </p>
              </div>
            </div>
          );
          result.push(pair);
        }
      } else {
        for (let i = 0; i < array.length; i += 2) {
          if (i === array.length - 1) {
            const solo = (
              <div className="pci-lc-row" key={i + 1}>
                <div className="pci-lc-col">
                  <h3
                    className="pci-lc-title"
                    style={{ fontSize: 18, color: "#333333" }}
                  >
                    {array[i][0] + ":"}
                  </h3>
                  <p className="pci-lc-desc">{array[i][1] || t("Not Found")}</p>
                </div>
              </div>
            );
            result.push(solo);
          } else {
            const pair = (
              <div className="pci-lc-row" key={i}>
                <div className="pci-lc-col">
                  <h3
                    className="pci-lc-title"
                    style={{ fontSize: 18, color: "#333333" }}
                  >
                    {array[i][0] + ":"}
                  </h3>
                  <p className="pci-lc-desc">{array[i][1] || t("Not Found")}</p>
                </div>
                <div className="pci-lc-col">
                  <h3
                    className="pci-lc-title"
                    style={{ fontSize: 18, color: "#333333" }}
                  >
                    {array[i + 1][0] + ":"}
                  </h3>
                  <p className="pci-lc-desc">
                    {array[i + 1][1] || t("Not Found")}
                  </p>
                </div>
              </div>
            );
            result.push(pair);
          }
        }
      }

      return result;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const header = document.querySelector(".pci-right-header");
    const body = document.querySelector(".pci-right-history");
    const footer = document.querySelector(".pci-right-footer");

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

  let isAnyFileUploading = false;

  // Check if any file is currently uploading
  if (project?.files) {
    isAnyFileUploading =
      project?.files?.length === 0
        ? isUploading
        : project.files.some(
            (file) => fileUploadStatus[file.file_name] === "uploading"
          );
  }

  let content;

  // loading
  if (isLoading) {
    content = (
      <div
        className="projects-container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress sx={{ color: "#3464c4" }} />
      </div>
    );
  } else {
    content = (
      <div className="project-item-container" style={{ position: "relative" }}>
        <div className="pci-left">
          <div className="pci-left-header">
            <div className="pci-lh-left">{project?.project_name}</div>
            <div className="pci-lh-right">
              <ButtonNav
                Comp={DeleteForeverOutlinedIcon}
                text={t("Delete")}
                onClick={deleteHandler}
              />
              <ButtonNav
                Comp={BorderColorOutlinedIcon}
                text={t("Edit")}
                onClick={() => navigate("edit")}
              />
              <ButtonNav
                Comp={AttachFileIcon}
                text={t("Files & Chat")}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>

          {shouldShowSpinner && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                // backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
                borderRadius: "5px",
                padding: "20px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}

          {(type === "plan" || uploadProgress === "completed") && (
            <div className="pci-left-content">
              <h3 className="pci-lc-title">{t("Description")}:</h3>
              <p className="pci-lc-desc full">
                {project.description || t("Generating") + " ..."}
              </p>

              <div className="pci-lc-row">
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Work content")}:</h3>
                  <p className="pci-lc-desc">{project.werkinhood || "NAN"}</p>
                </div>
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Enclosure")}:</h3>
                  <p className="pci-lc-desc">{project.enclosure || "NAN"}</p>
                </div>
              </div>
              <div className="pci-lc-row">
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Contract type")}:</h3>
                  <p className="pci-lc-desc">
                    {project.contract_type || "NAN"}
                  </p>
                </div>
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Client")}:</h3>
                  <p className="pci-lc-desc">{project.client || "NAN"}</p>
                </div>
              </div>
              <div className="pci-lc-row">
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Status")}:</h3>
                  <p className="pci-lc-desc">
                    {project.status || t("In progress")}
                  </p>
                </div>
                <div className="pci-lc-col">
                  <h3 className="pci-lc-title">{t("Results")}:</h3>
                  <p className="pci-lc-desc">
                    {project.result || t("Pending")}
                  </p>
                </div>
              </div>
              {/* <p className="pci-lc-desc full">{project.extracted_scores || '"overall": "","Organisatie van het werk": "5,40","Borgen bereikbaarheid, veiligheid, voorkomen hinder": "5,00","Invulling digitalisering opdracht": "5,27","Voorbereiding en kostencalculatie deelopdrachten": "6,00","Inrichten groeiplaats": "4,72","Planten van bomen": "4,60","Nazorgfase": "5,35","Brandstoffen < 3500kg": "120.000","Brandstoffen > 3500kg": "0","CO2-prestatieladder": "275.000","Extra inzet SROI": "50.000"'}</p> */}

              {renderScores().map((ItemScore, index) => {
                return (
                  <React.Fragment key={index}>{ItemScore} </React.Fragment>
                );
              })}
            </div>
          )}

          {uploadProgress !== "inProgress" &&
            uploadProgress !== "completed" &&
            type !== "plan" && (
              <div className="pci-left-content">
                <h3 className="pci-lc-title">{t("Description")}:</h3>
                <p className="pci-lc-desc full">
                  {project.description || t("Generating") + " ..."}
                </p>

                <div className="pci-lc-row">
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Work content")}:</h3>
                    <p className="pci-lc-desc">{project.werkinhood || "NAN"}</p>
                  </div>
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Enclosure")}:</h3>
                    <p className="pci-lc-desc">{project.enclosure || "NAN"}</p>
                  </div>
                </div>
                <div className="pci-lc-row">
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Contract type")}:</h3>
                    <p className="pci-lc-desc">
                      {project.contract_type || "NAN"}
                    </p>
                  </div>
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Client")}:</h3>
                    <p className="pci-lc-desc">{project.client || "NAN"}</p>
                  </div>
                </div>
                <div className="pci-lc-row">
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Status")}:</h3>
                    <p className="pci-lc-desc">
                      {project.status || t("In progress")}
                    </p>
                  </div>
                  <div className="pci-lc-col">
                    <h3 className="pci-lc-title">{t("Results")}:</h3>
                    <p className="pci-lc-desc">
                      {project.result || t("Pending")}
                    </p>
                  </div>
                </div>
                {/* <p className="pci-lc-desc full">{project.extracted_scores || '"overall": "","Organisatie van het werk": "5,40","Borgen bereikbaarheid, veiligheid, voorkomen hinder": "5,00","Invulling digitalisering opdracht": "5,27","Voorbereiding en kostencalculatie deelopdrachten": "6,00","Inrichten groeiplaats": "4,72","Planten van bomen": "4,60","Nazorgfase": "5,35","Brandstoffen < 3500kg": "120.000","Brandstoffen > 3500kg": "0","CO2-prestatieladder": "275.000","Extra inzet SROI": "50.000"'}</p> */}

                {renderScores().map((ItemScore, index) => {
                  return (
                    <React.Fragment key={index}>{ItemScore} </React.Fragment>
                  );
                })}
              </div>
            )}
        </div>

        <div className={open ? "pci-right" : "pci-right closed"}>
          <div
            className={open ? "pci-right-header" : "pci-right-header closed"}
          >
            <BadgeWithName length={project?.files?.length} name={t("Files")} />
            <ButtonNav
              Comp={CloseIcon}
              text={t("Close")}
              onClick={(e) => {
                setOpen(false);
              }}
            />
          </div>

          <ul
            className={open ? "pci-right-history" : "pci-right-history closed"}
          >
            {project?.files?.map((f, index) => {
              return <FilesListItem key={index} item={f} />;
            })}

            {isAnyFileUploading && (
              // Show spinner in the center while the file is uploading
              <div
                className="projects-container"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <CircularProgress sx={{ color: "#3464c4" }} />
              </div>
            )}
          </ul>

          <div
            className={open ? "pci-right-footer" : "pci-right-footer closed"}
          >
            <FileUploader
              type={type}
              setType={setType}
              setFile={setFiles}
              multi={false}
            />
            {files || !isUploading ? (
              <button className="cc-rf-button" onClick={uploadFiles}>
                <CloudUploadOutlinedIcon />
                {t("Upload File")}
              </button>
            ) : null}

            <button className="cc-rf-button" onClick={startChatting}>
              <MarkChatReadIcon />
              {t("Start Chatting")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default Project;
