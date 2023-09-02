import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { Button } from "bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";

function App() {
  const [tasks, setTasks] = useState([]);
  console.log("tasks are: ", tasks);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center pt-3 gap-20 mt-20 h-full">
        <CreateTodo tasks={tasks} setTasks={setTasks}></CreateTodo>
        <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
        {/* <button onClick={handleButton}>click</button> */}
      </div>
    </>
  );
}

export default App;
