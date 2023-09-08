import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const CreateTodo = ({ setMount }) => {
  const [task, setTask] = useState({ name: "", status: "todo" });
  // console.log("The local task is: ", task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.name.length < 3) {
      return toast.error("The task must have more than 3 characters");
    }
    if (task.name.length > 50) {
      return toast.error("The task must not be more than 30");
    }
    // setTasks(async (prev) => {
    //   console.log("the previous task state is: ", prev);
    //   const list = [...prev, task];
    //   const res = await axios.post("http://localhost:8080/saveTodo", { list });
    //   // localStorage.setItem("tasks", JSON.stringify(list));
    //   console.log("The response from post is: ", res);
    //   return list;
    // });
    try {
      const resp = await axios.post("http://localhost:8080/saveTodo", task);
      console.log("The response from post is: ", resp);
    } catch (err) {
      console.log("couldn't able to get the request ", err);
    }
    setMount(true);
    toast.success("task created");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-x-5">
          <input
            type="text"
            className=" border relative border-solid w-80 rounded-lg border-gray-400 py-2.5 pe-10 shadow-sm sm:text-sm pl-4"
            placeholder=""
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          ></input>
          <button
            type="submit"
            className="m-4 px-4 py-2 bg-blue-200 rounded-md hover:shadow-lg focus:outline-none focus:ring"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
