import React, { useState } from "react";
import "../assets/css/chat.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import FilesListItem from "./FilesListItem";
import FileUploader from "./FileUploader";
import { useUploadFileMutation } from "../features/files/filesApiSlice";

const ChatFiles = () => {
  const [name_of_tender, setNameOfTender] = useState("");
  const [file, setFile] = useState(null);
  const [submission_date, setSubmissionDate] = useState("");
  const [client, setClient] = useState("");
  const [contract_type, setContractType] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState("");
  const [categories, setCategories] = useState("");
  const [uploadFile] = useUploadFileMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    try {
      if (file) {
        bodyFormData.append("name_of_tender", name_of_tender);
        bodyFormData.append("submission_date", submission_date);
        bodyFormData.append("client", client);
        bodyFormData.append("contract_type", contract_type);
        bodyFormData.append("results", results);
        bodyFormData.append("status", status);
        bodyFormData.append("categories", categories);
        bodyFormData.append("file", file, file.name); // Corrected this line

        console.log(bodyFormData);
        const res = await uploadFile(bodyFormData);
        console.log(res);
      } else {
        console.log("no file");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const startChatting = async (e) => {
    // e.preventDefault();
    // try {
    //     await selectFile({ fileNames: selectedFiles })
    //     navigate("/chatbot")
    // } catch (error) {
    //     console.log(error)
    // }
  };
  return (
    <div className="chat-container" style={{ position: "relative" }}>
      <div className="cc-left">
        <div className="cc-left-header">
          <div className="cc-lh-left">AI Chat Helper</div>
          <div className="cc-lh-right">
            <TextField
              className="cc-lh-right-input"
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" className="cc-lh-right-button">
              <NotificationsOutlinedIcon className="cc-lh-rb-icon" />
            </Button>
            <Button variant="outlined" className="cc-lh-right-button">
              <AssignmentLateOutlinedIcon className="cc-lh-rb-icon" />
            </Button>
          </div>
        </div>
        <form className="cc-left-upload-container" onSubmit={submitHandler}>
          <FileUploader setFile={setFile} />
          {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" name='file' onChange={(e) => setFile(e.currentTarget.files[0])} />
                    </Button> */}
          <div className="cc-luc-form">
            <div className="cc-luc-form-left">
              <TextField
                label="name of tender"
                variant="outlined"
                className="cc-luc-form-input"
                value={name_of_tender}
                onChange={(e) => setNameOfTender(e.target.value)}
              />
              <TextField
                label="Submission date"
                variant="outlined"
                className="cc-luc-form-input"
                value={submission_date}
                onChange={(e) => setSubmissionDate(e.target.value)}
              />
              <TextField
                label="client"
                variant="outlined"
                className="cc-luc-form-input"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="cc-luc-form-right">
              <TextField
                label="status"
                variant="outlined"
                className="cc-luc-form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <TextField
                label="result"
                variant="outlined"
                className="cc-luc-form-input"
                value={results}
                onChange={(e) => setResults(e.target.value)}
              />
              <TextField
                label="contract type"
                variant="outlined"
                className="cc-luc-form-input"
                value={contract_type}
                onChange={(e) => setContractType(e.target.value)}
              />
            </div>
          </div>
          <TextField
            label="category"
            variant="outlined"
            className="cc-luc-form-input"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          <button type="submit" className="cc-rf-button-upload">
            <MarkChatReadIcon />
            Upload
          </button>
        </form>
      </div>
      <div className="cc-right">
        <div className="cc-right-header">
          <p>Files</p>
          <div className="cc-rh-total">8</div>
        </div>
        <ul className="cc-right-history">
          <FilesListItem />
        </ul>
        <div className="cc-right-footer">
          <button className="cc-rf-button" onClick={startChatting}>
            <MarkChatReadIcon />
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFiles;
