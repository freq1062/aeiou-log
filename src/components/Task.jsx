import { FaRegCheckSquare } from "react-icons/fa";

const Task = ({ task, onDelete }) => {
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`}>
      <h3>
        {task.text}{" "}
        <FaRegCheckSquare
          style={{ color: "green", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />{" "}
      </h3>
      <p>{task.day != "" ? `Due: ${task.day}` : "No Due Date"}</p>
    </div>
  );
};

export default Task;
