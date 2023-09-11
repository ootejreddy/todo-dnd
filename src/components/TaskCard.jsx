import { Draggable } from "react-beautiful-dnd";
import { pickRandomColor } from "../utils/pickRandomColor";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useRef } from "react";
const TaskCard = ({ task, id, tasks, setTasks, index }) => {
  const [input, setInput] = useState(task.name);
  console.log("The task is: ", task);
  console.log("Task card component rendered");

  // useEffect(() => {
  //   console.log("use effect called from task card");
  // }, [input]);

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const updateDataBase = debounce(async (input) => {
    task.name = input;
    const updateResponse = await axios.put(
      `http://localhost:8080/task/${id}`,
      task
    );
    toast("task has been updated to the database", { icon: "✅" });
    console.log("the updated response is: ", updateResponse);
  });

  const updateTaskHandler = (event) => {
    setInput(event.target.value);
    updateDataBase(event.target.value);
  };

  const handleDelete = async (id) => {
    // console.log("The id to delete is: ", id);
    // const filteredTasks = tasks.filter((task) => task.id !== id);
    const deleteResp = await axios.delete(`http://localhost:8080/task/${id}`);
    // console.log("The delete response is: ", deleteResp);
    const updatedTaskData = await axios.get("http://localhost:8080/tasks");
    setTasks(updatedTaskData.data);
    toast("task deleted", { icon: "❌" });
  };
  // const color = pickRandomColor().trim();
  // console.log("The color is:", color);
  return (
    <Draggable draggableId={id.toString()} key={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`relative p-4 mt-5 shadow-md rounded-md cursor-grab bg-blue-300`}
        >
          <input
            type="text"
            value={input}
            className={`font-semibold  border-none  text-black outline-none bg-blue-300`}
            onChange={updateTaskHandler}
          ></input>

          <button
            className="absolute bottom-1 right-1"
            onClick={() => handleDelete(task.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
