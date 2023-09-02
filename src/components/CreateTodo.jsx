import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const CreateTodo = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({ id: "", name: "", status: "todo" });
  console.log("The local task is: ", task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length < 3) {
      return toast.error("The task must have more than 3 characters");
    }
    if (task.name.length > 20) {
      return toast.error("The task must not be more than 20");
    }
    setTasks((prev) => {
      console.log("the previous task state is: ", prev);
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("task created");
    setTask({ id: "", name: "", status: "todo" });
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
            onChange={(e) =>
              setTask({ ...task, id: uuidv4(), name: e.target.value })
            }
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
