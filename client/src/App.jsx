import { useState } from "react";
import NewEntryView from "./NewEntryView";

// This variable controls which part of the UI is visible:

export default function App() {
  const [view, setView] = useState("new"); // view can be "new" or "list"

  // When the view changes, this data persists:
  const [inputText, setInputText] = useState(""); // example state to observe persistence

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lab 3 Demo</h1>

      {/* Buttons to switch views */}
      <button onClick={() => setView("new")}>New</button>
      <button onClick={() => setView("list")}>List</button>

      <hr />

      {/* View Rendering */}
      {view === "new" && (
        <NewEntryView inputText={inputText} setInputText={setInputText} />
      )}

      {view === "list" && (
        <div>
          <h2>List View</h2>
          <p>Input text from other view:</p>
          <div className="card">{inputText || "(empty)"}</div>
        </div>
      )}

      {/* After moving this JSX into a component, this stopped working:After moving this JSX into a component, nothing stopped working. */}
    
      // This state lives in App.jsx: inputText

      /*
      Observations:
      - Data that persisted across views:
      - Data that reset when views changed:
      */

      /*
      Possible future side effects in this app:
      - Something that should happen when a view appears: maybe load saved items
      - Something that should happen when data changes: maybe save the input somewhere
      */

      /*
      Reflection:
      - One thing that surprised me about switching views: the input text stayed the same
      - One thing that felt confusing: why the component resets or doesn’t reset
      - One question I have about how React manages data: how does React decide what state to keep?

      */
    </div>
  );
}
