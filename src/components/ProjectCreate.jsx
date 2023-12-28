import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FileUploader from "./FileUploader";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import { useUploadFileMutation } from "../features/files/filesApiSlice";
import "../assets/css/project.css";
import { useAddProjectMutation } from "../features/projects/ProjectApiSlice";
import ButtonNav from "./ButtonNav";
import { useTranslation } from "react-i18next";
const ProjectCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [project_name, setProject_Name] = useState("New project");
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("guidelines");
  const [werkinhood, setWerkinhood] = useState("");
  const [client, setClient] = useState("");
  const [contract_type, setContractType] = useState("");
  const [status, setStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");
  const [enclosure, setEnclosure] = useState("");
  const [uploadFile] = useUploadFileMutation();
  const [addProject] = useAddProjectMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        project_name,
        werkinhood,
        client,
        contract_type,
        status,
        enclosure,
        description: desc,
        result,
      };
      const res = await addProject(obj).unwrap();
      console.log(res);
      if (files && files.length !== 0) {
        const formData = new FormData();
        formData.append("uploaded_file", files);
        formData.append("project_id", res.project_id);
        formData.append("type", type);
        await uploadFile(formData);
        setFiles(null);
      }
      navigate(`/projects/${res.project_id}`);
      console.log(`/projects/${res.project_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="project-item-container" style={{ position: "relative" }}>
      <div className="pci-left">
        <div className="pci-left-header">
          <div className="pci-lh-left">{project_name}</div>
          <div className="pci-lh-right">
            <ButtonNav
              text={t("projects")}
              Comp={DatasetOutlinedIcon}
              onClick={(e) => {
                navigate("/projects");
              }}
            />
          </div>
        </div>
        <form className="pci-left-upload-container" onSubmit={submitHandler}>
          <FileUploader
            setFile={setFiles}
            multi={false}
            type={type}
            setType={setType}
          />
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
                  <MenuItem value={"in progress"}>{t("In progress")}</MenuItem>
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
            {t("Create")}
          </button>
        </form>
      </div>
      <PageTransition />
    </div>
  );
};

export default ProjectCreate;
