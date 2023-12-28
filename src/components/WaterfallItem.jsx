import React from "react";

import TaskItem from "./TaskItem";
const WaterfallItem = ({ text = "New Projects", data, id }) => {
  return (
    <div className="tasks-container-left-content-row-waterfall-item " id={id}>
      <h3 style={{ margin: 0 }}>{text}</h3>
      <div className="line-devider-tasks"></div>
      {data.map((task, index) => {
        return (
          <TaskItem
            due={task.due_date.split("T")[0]}
            key={index}
            title={task.title}
            taskId={task.id}
            progress="10%"
          />
        );
      })}
    </div>
  );
};

export default WaterfallItem;
