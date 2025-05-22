import react from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note">
      <div className="note-card">
        {/* Front of the card */}
        <div className="note-front">
          <p className="note-title">{note.title}</p>
          <p className="note-date">{formattedDate}</p>
          <p className="note-author">Author ID: {note.author}</p>
        </div>

        {/* Back of the card */}
        <div className="note-back">
          <p className="note-content">{note.content}</p>
          <button className="delete-button" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;