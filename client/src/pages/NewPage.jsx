import { useState } from "react";

function NewView({ onSave }) {
  const [title, setTitle] = useState("");

  return (
    <div>
      <h2>New View</h2>

      <label>
        Title:{" "}
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => {
            onSave(title);
            setTitle("");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NewView;
