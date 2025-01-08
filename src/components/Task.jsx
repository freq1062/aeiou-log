import { FaRegCheckSquare } from "react-icons/fa";

const Task = ({ task, onDelete }) => {
  return (
    <div className="task">
      <h3>
        {task.text}{" "}
        <FaRegCheckSquare
          style={{ color: "green", cursor: "pointer" }}
          onClick={() => onDelete(task._id)}
        />{" "}
      </h3>
      <p>{task.day != "None" ? `Due: ${task.day}` : "No Due Date"}</p>
      <p>Created: {task.created}</p>
    </div>
  );
};

export default Task;
