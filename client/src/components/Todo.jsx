import React, { useState, useEffect } from "react"
import axios from "axios"
import Wallpaper from "../assets/rec.png"
import Add from "../assets/add-button.png"
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png"
import { format } from "date-fns"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

const Todo = () => {
    const [currentTime, setCurrentTime] = useState("")
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [taskName, setTaskName] = useState("")
    const navigate = useNavigate()

      useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      setError(null)

      try {
          const response = await fetch("http://localhost:3001/api/v1/tasks")
          
          const jsonData = repsonse.json();
          setTasks(jsonData)
          console.log(jsonData)
        // setTasks(response?.data?.tasks)
        setLoading(false)
      } catch (error) {
        setError("Error fetching tasks")
        setLoading(false)
      }
    }

    fetchTasks()
      }, []) //dependency array, loads once the page renders 

    useEffect(() => {
    const interval = setInterval(() => {
    const now = new Date()
    setCurrentTime(format(now, "h:mm a"))
    }, 1000)

    return () => clearInterval(interval)
    }, [])

    const today = new Date()
    const formattedDate = format(today, "MMMM d, yyyy")
    const secondFormattedDate = format(today, "MMMM d")
    const dayOfWeek = format(today, "EEEE")

    
    // Handle adding a new task
    const handleAddTask = async (e) => {
    e.preventDefault()

    try {
      // setLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/api/v1/tasks", {
        name: taskName,
      })

    setTaskName("")
    const jsonData = response.json()
      setTasks((prevTasks) => [...prevTasks, jsonData?.tasks])
      toast.success("Task added successfully!")
    } catch (error) {
        toast.error("Errpr adding task!")
        setError("Error adding task")
        setLoading(false)
    }
  }

    // Handle Delete Task
    const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true)
      setError(null)

      await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`)

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully!")
    } catch (error) {
      setError("Error deleting task")
    }
  }

  return (
        <>
      <div className="font-['poppins']">
        <div className="flex my-5 justify-center">
          <p className="font-bold text-[50px] text-[#007FDB]">Todo</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white h-[240px] w-[350px] shadow-lg shadow-indigo-500/40">
            <img src={Wallpaper} className="h-[180px]" alt="nature" />

            <div className="text-white px-3 text-right my-[-90px]">
              <p>{dayOfWeek}</p>
              <p>{formattedDate}</p>
              <p className="text-[40px] font-extrabold my-[-10px]">
                {currentTime}
              </p>
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="focus:outline-none"
                  >
                    <img
                      src={Add}
                      className="h-[45px] width-[45px] mx-2 my-[-2px]"
                      alt="nature"
                    />
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
                      onClick={() => navigate(`/edit/${task._id}`)} // Assuming you have imported 'useNavigate' as 'navigate'
                      className="focus:outline-none"
                    >
                      <img
                        src={Edit}
                        className="h-[20px] mb-[25px] width-[20px]"
                        alt="Edit"
                      />
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
      <div className="h-[500px]"></div>

      <Footer />
      <ToastContainer />
    </>
  )
}

export default Todo