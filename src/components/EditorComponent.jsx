import React, { useRef, useState, useEffect } from "react";
// import { JoditEditor } from "./Jodit";
import JoditEditor from "jodit-react";

const EditorComponent = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState(props.currentEntry);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setContent(props.currentEntry);
  }, [props.currentEntry]);

  const config = {
    readonly: false,
    height: 400,
    toolbarButtonSize: "middle",
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
    uploader: {
      insertImageAsBase64URI: true,
    },
    askBeforePasteHTML: false,
  };

  function handleChange(newContent) {
    // wait 5 seconds before saving to state
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // setContent(newContent);
    timeoutRef.current = setTimeout(() => {
      props.setCurrentEntry(newContent);
      console.log("Saved to state");
    }, 5000);
  }

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          handleChange(newContent);
        }}
      />
      {/* <div style={{ marginTop: "20px" }}>
        <h3>Content:</h3>
        <pre>{props.currentEntry}</pre>
      </div> */}
    </div>
  );
};

export default EditorComponent;
