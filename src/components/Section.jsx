import React from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";

const Section = ({ status, tasks, inProgress, closed, setTasks, todos }) => {
  let text = "todo";
  let bg = "bg-purple-500";
  let tasksToMap = todos;

  //* helper function to drop the item
  const addItemToDrop = (id) => {
    console.log("dropped id:", id, status);
    setTasks((prev) => {
      const updateTaskSection = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updateTaskSection));
      toast("task status changed", { icon: "🥳" });
      return updateTaskSection;
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
    <div
      ref={drop}
      className={`bg-slate-100 w-[300px]  text-sm  h-[650px] rounded-xl text-center  shadow-xl ${
        isOver ? "w-[400px]" : ""
      }`}
    >
      {/* header component */}
      <Header text={text} bg={bg} count={tasksToMap.length}></Header>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <TaskCard
            task={task}
            id={task.id}
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
