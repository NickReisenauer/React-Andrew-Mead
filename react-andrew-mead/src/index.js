import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) setNotes(notesData);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note, idx) => (
        <div key={idx}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button
            onClick={(e) => {
              setNotes(
                notes.filter(
                  (individualNote) => individualNote.title !== note.title
                )
              );
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <p>Add a note</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotes([...notes, { title, body }]);
          setTitle("");
          setBody("");
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Add note</button>
      </form>
    </div>
  );
};

const App = (props) => {
  const [count, setCount] = useState(props.count);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("This should only run once");
  }, []);

  useEffect(() => {
    console.log("useEffect ran");
    document.title = count;
  }, [count]);

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
