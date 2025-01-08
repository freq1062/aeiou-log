import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "./components/Router.jsx";

function App() {
  // //From MongoDB
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/items")
  //     .then((response) => console.log(response)) //setItems(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
