import React, { useState, useEffect } from "react";
import TaskHeader from "../components/TaskHeader";
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
import axios from "axios";

/*
task:
{
  id: 1,
  text: "Task 1",
  day: "2024-12-28",
  created: "2024-12-24",
}
*/

export default function Reminders() {
  const BACKEND_URL = "http://localhost:4000";
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Fetch tasks from MongoDB
  async function getTasks() {
    try {
      const savedTasks = await axios.get(`${BACKEND_URL}/getTasks`);
      setTasks(savedTasks.data);
    } catch (err) {
      console.error("Error getting tasks:", err);
    }
  }

  //Add Task
  async function addTask(newTask) {
    try {
      const response = await axios.post(`${BACKEND_URL}/addTask`, newTask);
      const savedTask = response.data;
      setTasks([...tasks, { ...newTask, _id: savedTask }]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  //Delete Task
  async function deleteTask(id) {
    try {
      axios.delete(`${BACKEND_URL}/deleteTask/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
    //Basically: filter set tasks to show every id except input id
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <TaskHeader
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}
