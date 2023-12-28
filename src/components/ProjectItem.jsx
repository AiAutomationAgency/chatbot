import React from "react";
import "../assets/css/projects.css";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({ item }) => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate(`${item?.project_id}`);
  };
  return (
    <div className="pc-lc-row-item" onClick={ClickHandler}>
      <div className="pc-lc-ri-header">{item?.project_name}</div>
      <p className="pc-lc-ri-desc">{item?.description}</p>
      <div className="pc-lc-ri-desc-date">{item?.timestamp?.split("T")[0]}</div>
      <div className="pc-lc-ri-pill">active</div>
    </div>
  );
};

export default ProjectItem;
