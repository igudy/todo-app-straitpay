import React, { useState, useEffect } from "react";
import Wallpaper from "../assets/rec.png";
import Add from "../assets/add-button.png";
import Delete from "../assets/delete.png";
import Edit from "../assets/edit.png";
import { format } from "date-fns";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null);
  const [taskName, setTaskName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3001/api/v1/tasks");

        if (!response.ok) {
          throw new Error("Error fetching tasks");
        }

        const data = await response.json();
        setTasks(data.tasks);
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        setError("Error fetching tasks");
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(format(now, "h:mm a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const dayOfWeek = format(today, "EEEE");

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      const response = await fetch("http://localhost:3001/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: taskName }),
      });

      if (!response.ok) {
        throw new Error("Error adding task");
      }

      setTaskName("");
      const jsonData = await response.json();
      setTasks((prevTasks) => [...prevTasks, jsonData.task]);
      toast.success("Task added successfully!");
    } catch (error) {
      setError("Error adding task");
      toast.error("Error adding task!");
    }
  };

  // Handle Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3001/api/v1/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      setError(err);
      toast.error("Error deleting task!");
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering based on the loading state
  if (loading) {
    return <div>
      <div className="text-center">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 my-10 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>


    </div>;
  }

  return (
    <>
      <div>
        <div className="flex my-5 justify-center">
          <p className="font-bold text-[50px] text-[#007FDB]">Todo</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white h-[240px] w-[350px] shadow-lg shadow-indigo-500/40">
            <img src={Wallpaper} className="h-[180px]" alt="nature" />

            <div className="text-white px-3 text-right my-[-90px]">
              <p>{dayOfWeek}</p>
              <p>{formattedDate}</p>
              <p className="text-[40px] font-extrabold my-[-10px]">{currentTime}</p>
            </div>
            <div className="my-[90px]"></div>
            <div className="mx-[13px] mt-5">
              
              {/* Form to submit task */}
              <form onSubmit={handleAddTask}>
                <div className="flex mt-6">
                  <input
                    type="text"
                    id="task"
                    className="block p-2 text-[#888888] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-300  h-[40px] w-[250px]"
                    placeholder="Add Task"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button type="submit" disabled={loading} className="focus:outline-none">
                    <img src={Add} className="h-[45px] width-[45px] mx-2 my-[-2px]" alt="nature" />
                  </button>
                </div>
              </form>

              {/* Tasks */}
              {tasks.map((task) => (
                <div
                  className="flex flex-wrap mt-7 bg-white  border-2 border-gray-500 h-[50px] w-[330] hover:border-hidden rounded-xl shadow-lg shadow-indigo-500/20"
                  key={task?._id}
                >
                  <div className="mt-3 px-3">
                    <p className="text-black-300">{task?.name}</p>
                  </div>

                  <div className="flex space-x-4 ml-auto mt-3">
                    <button
                      onClick={() => navigate(`/edit/${task._id}`)}
                      className="focus:outline-none"
                    >
                      <img src={Edit} className="h-[20px] mb-[25px] width-[20px]" alt="Edit" />
                    </button>
                    <img
                      src={Delete}
                      className="h-[20px] width-[20px] !mr-[7px] cursor-pointer"
                      alt="Delete"
                      onClick={() => handleDeleteTask(task._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Todo;
