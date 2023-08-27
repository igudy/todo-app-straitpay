import React, { useState, useEffect } from "react"
import Wallpaper from "../assets/rec.png"
import { useParams, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Edit = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [taskName, setTaskName] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/tasks/${taskId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching task");
        }

        const data = await response.json();
        setTaskName(data.name);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(false)

    try {
      const response = await fetch(`http://localhost:3001/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: taskName})
      })

      if (!response.ok) {
        throw new Error("Error updating task");
      }
      toast.success("Task updated successfully!")
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="font-space-grotesk">
        <div className="flex my-5 justify-center">
          <p className="font-bold text-[50px] text-[#007FDB]">Edit Task</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white h-[240px] w-[350px] shadow-lg shadow-indigo-500/40">
            <img src={Wallpaper} className="h-[180px]" alt="nature" />

            <div className="mx-[13px] mt-3">
              <form onSubmit={handleUpdateTask}>
                <div className="flex">
                  <input
                    type="text"
                    id="task"
                    className="block p-2 text-[#888888] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-300  h-[40px] w-[250px]"
                    placeholder={taskName}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button type="submit" className="focus:outline-none flex  my-1 mx-2 px-3 border-2 ml-2 border-gray-500 rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer">
                      Update
                  </button>
                </div>
              </form>
              {/* </form> */}

              {/* Tasks */}
              <div className="flex mt-7 bg-white  border-2 border-gray-500 h-[70px] w-[330] hover:border-hidden rounded-xl shadow-lg shadow-indigo-500/20">
                <div className="flex space-x-4 mx-auto my-2">
                  <button
                    onClick={() => navigate(`/`)} 
                    className="focus:outline-none"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Edit
