import Task from "./Task";

export default function Tasks({ tasks, onDelete }) {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onDelete={onDelete} />
      ))}
    </>
  );
}
