import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import "../assets/css/project.css";
import {
  useFetchProjectByIdQuery,
  useUpdateProjectMutation,
} from "../features/projects/ProjectApiSlice";
import ButtonNav from "./ButtonNav";
import { useTranslation } from "react-i18next";

const ProjectEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const project_id = useParams().projectId;
  const {
    data: project,
    isLoading,
    isSuccess,
  } = useFetchProjectByIdQuery(project_id);
  const [project_name, setProject_Name] = useState("");
  const [werkinhood, setWerkinhood] = useState("");
  const [client, setClient] = useState("");
  const [contract_type, setContractType] = useState("");
  const [status, setStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");
  const [enclosure, setEnclosure] = useState("");
  const [updateProject] = useUpdateProjectMutation();
  useEffect(() => {
    if (isSuccess && project) {
      setProject_Name(project.project_name);
      setWerkinhood(project.werkinhood);
      setClient(project.client);
      setContractType(project.contract_type);
      setStatus(project.status || "in progress");
      setDesc(project.description);
      setResult(project.results || "in progress");
      setEnclosure(project.enclosure || "NAN");
    }
  }, [project, isSuccess]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        project_name,
        werkinhood,
        client,
        contract_type,
        status,
        result,
        description: desc,
        enclosure,
      };
      await updateProject({ data: obj, project_id: project_id });
      navigate(`/projects/${project_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  let content;
  if (isLoading) {
    content = (
      <div className="project-item-container" style={{ position: "relative" }}>
        <div className="pci-left">
          <div className="pci-left-header">
            <div className="pci-lh-left">{project_name}</div>
            <div className="pci-lh-right">
              <ButtonNav
                text={"Projects"}
                Comp={DatasetOutlinedIcon}
                onClick={(e) => {
                  navigate("/projects");
                }}
              />
              <ButtonNav
                text={"Cancel"}
                Comp={CancelIcon}
                onClick={(e) => {
                  navigate(`/projects/${project_id}`);
                }}
              />
            </div>
          </div>
          <form className="pci-left-upload-container" onSubmit={submitHandler}>
            <CircularProgress />
          </form>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="project-item-container" style={{ position: "relative" }}>
        <div className="pci-left">
          <div className="pci-left-header">
            <div className="pci-lh-left">{project_name}</div>
            <div className="pci-lh-right">
              <ButtonNav
                text={t("Projects")}
                Comp={DatasetOutlinedIcon}
                onClick={(e) => {
                  navigate("/projects");
                }}
              />
              <ButtonNav
                text={t("Cancel")}
                Comp={CancelIcon}
                onClick={(e) => {
                  navigate(`/projects/${project_id}`);
                }}
              />
            </div>
          </div>
          <form className="pci-left-upload-container" onSubmit={submitHandler}>
            <div className="pci-luc-form">
              <div className="pci-luc-form-left">
                <TextField
                  label={t("Project name")}
                  variant="outlined"
                  className="pci-luc-form-input"
                  value={project_name}
                  onChange={(e) => setProject_Name(e.target.value)}
                />
                <TextField
                  label={t("Client")}
                  variant="outlined"
                  className="pci-luc-form-input"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
                <TextField
                  label={t("Enclosure")}
                  variant="outlined"
                  className="pci-luc-form-input"
                  value={enclosure}
                  onChange={(e) => setEnclosure(e.target.value)}
                />
              </div>
              <div className="pci-luc-form-right">
                <FormControl fullWidth>
                  <InputLabel
                    className="pci-luc-fi-label"
                    id="demo-simple-select-label"
                  >
                    {t("Status")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={status}
                    label={t("Status")}
                    onChange={(e) => setStatus(e.target.value)}
                    className="pci-luc-form-input"
                  >
                    <MenuItem value={"in progress"}>
                      {t("In progress")}
                    </MenuItem>
                    <MenuItem value={"pending"}>{t("Pending")}</MenuItem>
                    <MenuItem value={"finished"}>{t("Finished")}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    className="pci-luc-fi-label"
                    id="demo-simple-select-label-results"
                  >
                    {t("Result")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-results"
                    value={result}
                    label={t("Result")}
                    onChange={(e) => setResult(e.target.value)}
                    className="pci-luc-form-input"
                  >
                    <MenuItem value={"WON"}>{t("Won")}</MenuItem>
                    <MenuItem value={"LOST"}>{t("Lost")}</MenuItem>
                    <MenuItem value={"PENDING"}>{t("Pending")}</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label={t("Contract type")}
                  variant="outlined"
                  className="pci-luc-form-input"
                  value={contract_type}
                  onChange={(e) => setContractType(e.target.value)}
                />
              </div>
            </div>
            <TextField
              label={t("Work content")}
              multiline
              maxRows={2}
              minRows={2}
              variant="outlined"
              className="pci-luc-form-input"
              value={werkinhood}
              onChange={(e) => setWerkinhood(e.target.value)}
            />
            <TextField
              label={t("Description")}
              multiline
              maxRows={4}
              minRows={4}
              variant="outlined"
              className="pci-luc-form-input"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button type="submit" className="pci-rf-button-upload">
              <MarkChatReadIcon />
              {t("Update")}
            </button>
          </form>
        </div>
      </div>
    );
  }
  return content;
};

export default ProjectEdit;
