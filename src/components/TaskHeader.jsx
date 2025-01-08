import PropTypes from "prop-types";
import Button from "./Button";

const TaskHeader = ({ title = "Tasks", onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1 style={headingStyle}>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};
TaskHeader.propTypes = {
  title: PropTypes.string,
};

const headingStyle = {
  color: "black",
  backgroundColor: "transparent",
};

export default TaskHeader;
