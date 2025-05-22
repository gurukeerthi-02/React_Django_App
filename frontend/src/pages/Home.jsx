import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNotes = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted !");
        } else {
          alert("Failed to delete note !");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNotes = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created !");
        } else {
          alert("Failed to create !");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <div className="notes-container">
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNotes} key={note.id}></Note>
        ))}
        </div>
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNotes}>
        <label htmlFor="title">Title:</label>
        <br></br>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <label htmlFor="content">Content:</label>
        <br></br>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
