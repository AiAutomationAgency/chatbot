import React from "react";
import "../assets/css/badge-with-name.css";
const BadgeWithName = ({ name, length }) => {
  return (
    <div className="badge-with-name">
      <p className="badge-with-name-name">{name || "error"}</p>
      <p className="badge-with-name-length">{length}</p>
    </div>
  );
};

export default BadgeWithName;
