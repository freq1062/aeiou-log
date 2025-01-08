import React, { useRef, useState, useEffect } from "react";
import EditorComponent from "../components/EditorComponent";
import axios from "axios";
// import { writeDataToDate } from "../../backend/write";
// import "bootstrap/dist/css/bootstrap.min.css"; //what even is this bro "../../backend/write"; hi

export default function Home() {
  const currentDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  const [entryByDate, setEntryByDate] = useState(""); //{date: "2024-12-24", entry: "This is a post from React. Hello!"}
  // const [entriesByKeyword, setEntriesByKeyword] = useState([]); //{keyword: "test", entries: ["2024-12-24", "2024-12-25" ... ]}
  const [currentEntry, setCurrentEntry] = useState("");
  const [searchDate, setSearchDate] = useState("");

  async function addEntryToDate(date, entry) {
    //Add entry to MongoDB
    try {
      await axios.post("http://localhost:4000/addEntry", {
        date,
        entry,
      });
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  async function updateEntryAtDate(date, newEntry) {
    // Update entry at date in MongoDB
    try {
      const response = await axios.patch("http://localhost:4000/updateEntry", {
        date,
        newEntry,
      });
      if (response.status === 200) {
        setCurrentEntry(newEntry);
      }
      return "Entry updated!";
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  }

  async function findEntryByDate(date) {
    //Return entry at date in MongoDB
    //req with YYYY-MM-DD
    try {
      const response = await axios.get(
        `http://localhost:4000/getEntries/${date}`
      );
      if (response.data.length > 0) {
        return response.data[0].entry;
      } else {
        await addEntryToDate(date, "No entry for this date yet.");
        return "No entry for this date yet.";
      }
    } catch (error) {
      console.error("Error finding entry:", error);
    }
  }

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    findEntryByDate(searchDate).then((data) => {
      setEntryByDate(data);
    });
  };

  useEffect(() => {
    //When loading the page display the entry for the current date
    findEntryByDate(currentDate).then((data) => {
      setCurrentEntry(data);
    });
  }, []);

  useEffect(() => {
    console.log("Current entry was updated", currentEntry);
    if (currentEntry && currentEntry !== "No entry for this date yet.") {
      updateEntryAtDate(currentDate, currentEntry);
    }
  }, [currentEntry]);

  return (
    <main>
      <h1 className="entry-header">{currentDate}</h1>
      <EditorComponent
        currentEntry={currentEntry}
        setCurrentEntry={setCurrentEntry}
      />
      <form onSubmit={handleSearch}>
        <label htmlFor="search-date">Enter Date:</label>
        <input
          type="date"
          id="search-date"
          value={searchDate}
          onChange={handleDateChange}
        />
        <button type="submit">Search</button>
      </form>
      {entryByDate && <p>{entryByDate}</p>}
    </main>
  );
}
