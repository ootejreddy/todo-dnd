import React, { useState, useEffect } from "react";
import Section from "./Section";
import { Droppable } from "react-beautiful-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInprogress] = useState([]);
  const [closed, setClosed] = useState([]);
  useEffect(() => {
    console.log("use effect called from listTasks.js");
    setTodos(tasks.filter((task) => task.status === "todo"));
    setInprogress(tasks.filter((task) => task.status === "inprogress"));
    setClosed(tasks.filter((task) => task.status === "closed"));
  }, [tasks]);

  const states = ["todo", "inprogress", "closed"];

  console.log("filtered todos are: ", todos);

  return (
    <div className="flex justify-center w-full space-x-10 h-full flex-wrap">
      {states.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          inProgress={inProgress}
          closed={closed}
          todos={todos}
          setTasks={setTasks}
        ></Section>
      ))}
    </div>
  );
};

export default ListTasks;
