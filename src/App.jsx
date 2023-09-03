import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import ListTasks from "./components/ListTasks";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState([]);
  console.log("tasks are: ", tasks);

  //* this useEffect help us to persist data in localstorage
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  const dragHandler = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return toast("this is not the droppable area", { icon: "❌" });
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    setTasks((prev) => {
      const updateTaskSection = prev.map((task) => {
        if (task.id === result.draggableId) {
          return { ...task, status: destination.droppableId };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updateTaskSection));
      toast("task status changed", { icon: "🥳" });
      return updateTaskSection;
    });
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <Toaster />
      <div className="flex flex-col items-center pt-3 gap-20 mt-20 h-full">
        <CreateTodo tasks={tasks} setTasks={setTasks}></CreateTodo>
        <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
        {/* <button onClick={handleButton}>click</button> */}
      </div>
    </DragDropContext>
  );
}

export default App;
