import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "../assets/css/chat.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentShow } from "../features/files/filesSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: 2,
  borderWidth: 2,
  borderColor: "#3464c4",
  borderStyle: "dashed",
  backgroundColor: "white",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#3464c4",
};

const acceptStyle = {
  borderColor: "#3464c4",
};

const rejectStyle = {
  borderColor: "red",
};

const FileUploader = ({ setFile, setFiles, multi, setType, type }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: multi ? 3 : 1,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const show = useSelector(selectCurrentShow);

  useEffect(() => {
    if (multi) {
      setFiles(acceptedFiles);
    } else {
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, setFile, setFiles, multi]);

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input className="file-uploader-input-field" {...getInputProps()} />
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faCloudUploadAlt}
            style={{
              marginRight: "10px",
              fontSize: "20px",
              color: "#3464c4",
            }}
          />
          <span style={{ color: "#3464c4" }}>
            Drag & drop a PDF here {""}
            <em>(Only *.pdf files will be accepted)</em>
          </span>
        </p>
      </div>

      <aside>
        {acceptedFiles.length !== 0 && show ? (
          <div className="cf-uploaded-file">
            {multi ? (
              acceptedFiles.map((acceptedFile, index) => {
                return <span key={index}>{acceptedFile.path}</span>;
              })
            ) : (
              <span>{acceptedFiles[0].path}</span>
            )}
          </div>
        ) : null}

        {acceptedFiles.length !== 0 && !multi && show ? (
          <FormControl style={{ marginTop: "10px" }} fullWidth>
            <InputLabel
              className="pci-luc-fi-label"
              id="demo-simple-select-label"
            >
              Type
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
              className="pci-luc-form-input"
            >
              <MenuItem value={"results"}>Results</MenuItem>
              <MenuItem value={"plan"}>Plan</MenuItem>
              <MenuItem value={"guidelines"}>Guidelines</MenuItem>
            </Select>
          </FormControl>
        ) : null}
      </aside>
    </section>
  );
};

export default FileUploader;
