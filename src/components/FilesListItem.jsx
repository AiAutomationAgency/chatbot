import React, { useEffect, useState } from "react";
import "../assets/css/filesListItem.css";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSelectedFiles,
  selectFile,
} from "../features/files/filesSlice";

const FilesListItem = ({ item }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const selectedFiles = useSelector(selectCurrentSelectedFiles);
  const [updated, setUpdated] = useState([]);
  const ClickHandler = (e) => {
    if (e.currentTarget.classList.contains("active")) {
      setActive(false);
    } else {
      setActive(true);
    }
    if (selectedFiles && selectedFiles.indexOf(item.file_name) !== -1) {
      setUpdated(selectedFiles.filter((itm) => itm !== item.file_name));
    } else {
      setUpdated([...selectedFiles, item.file_name]);
    }
  };
  useEffect(() => {
    dispatch(selectFile(updated));
  }, [updated, dispatch]);

  return (
    <li
      onClick={ClickHandler}
      className={active ? "cc-rh-file-item active" : "cc-rh-file-item"}
    >
      <Checkbox className="cc-rh-fi-checkbox" checked={active} />
      <div className="cc-rh-fi-content">
        <div className="cc-rh-fi-title">{item.file_name}</div>
        <div className="cc-rh-fi-desc">{item.type}</div>
      </div>
    </li>
  );
};

export default FilesListItem;
