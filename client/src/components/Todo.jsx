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

  return (
    <div>Todo</div>
  )
}

export default Todo