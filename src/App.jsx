import { useState, useEffect } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import ListTasks from "./components/ListTasks";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { Result } from "postcss";

function App() {
  const [mount, setMount] = useState();
  const [tasks, setTasks] = useState();
  const url = "http://localhost:8080/tasks";
  // console.log("tasks are: ", tasks);
  // console.log("component rendered");
  //* this useEffect help us to persist data in localstorage
  useEffect(() => {
    setMount(false);
    axios
      .get(url)
      .then((res) => {
        console.log("The response of get data is: ", res.data);
        setTasks(res.data);
      })
      .catch((err) => console.log("error fetching data", err));
  }, [mount]);

  // console.log("The todos data from the spring server is ", tasks);

  const dragHandler = async (result) => {
    console.log("The result is: ", result);
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
    const filteredTask = tasks.filter(
      (task) => task.id === parseInt(result.draggableId)
    );
    const updatedTask = filteredTask[0];
    updatedTask.status = destination.droppableId;
    console.log("The updatedTask task from filtered is: ", updatedTask);
    const updateResponse = await axios.put(
      `http://localhost:8080/task/${updatedTask.id}`,
      updatedTask
    );
    toast("task has been updated to the database", { icon: "✅" });
    console.log("the updated response is: ", updateResponse);

    axios
      .get(url)
      .then((res) => {
        console.log("The response of get data is: ", res.data);
        setTasks(res.data);
      })
      .catch((err) => console.log("error fetching data", err));
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <Toaster />
      <div className="flex flex-col items-center pt-3 gap-20 mt-20 h-full">
        <CreateTodo setMount={setMount}></CreateTodo>
        <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
        {/* <button onClick={handleButton}>click</button> */}
      </div>
    </DragDropContext>
  );
}

export default App;
