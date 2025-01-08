import React, { useState } from "react";
import TaskHeader from "../components/TaskHeader";
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

const Reminders = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "make this app",
      day: "May 27 2024",
    },
  ]);

  //Add Task
  const addTask = (task) => {
    const newTask = {
      id: Object.keys(tasks).length + 1,
      ...task,
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = (id) => {
    //console.log("Delete", id);
    setTasks(tasks.filter((task) => task.id !== id));
    //Basically: filter set tasks to show every id except input id
  };

  return (
    <div className="container">
      {console.log("Loading")}
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
};

export default Reminders;
