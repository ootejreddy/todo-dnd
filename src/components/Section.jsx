import React from "react";
import TaskCard from "./TaskCard";

const Section = ({ status, tasks, inProgress, closed, setTasks, todos }) => {
  let text = "todo";
  let bg = "bg-purple-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "in progress";
    bg = "bg-blue-500";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "completed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  return (
    <div className="bg-slate-100 w-[300px]  text-sm  h-[650px] rounded-xl text-center  shadow-xl">
      <Header text={text} bg={bg} count={tasksToMap.length}></Header>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            tasks={tasks}
            setTasks={setTasks}
          ></TaskCard>
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} rounded-md flex items-center justify-center uppercase text-white h-12 `}
    >
      {text}{" "}
      <div className="ml-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

export default Section;
