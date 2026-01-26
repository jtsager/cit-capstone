import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api.js";

export default function NewPage() {
  const nav = useNavigate();

  // This state is storing the value for the new entry.
  // It changes when I type in the form, and the UI updates to match.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // This state represents whether the new entry should be marked as important.
  // When it changes, the UI updates the ON/OFF display automatically.
  const [isImportant, setIsImportant] = useState(false);

  // When a tag is added, the tags list changes, and React updates the UI automatically.
  const [tags, setTags] = useState([]);

  const [newTag, setNewTag] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const created = await api.createItem({ title, description, status });
      nav(`/items/${created.id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h1>New Item</h1>
      <form className="stack" onSubmit={onSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short and clear"
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">active</option>
            <option value="done">done</option>
          </select>
        </label>

        {/* Important checkbox */}
        <label style={{ display: "block", marginTop: 12 }}>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          {" "}Mark as important
        </label>

        {/* ON/OFF display */}
        <p style={{ marginTop: 8 }}>
          Important is currently: <strong>{isImportant ? "ON" : "OFF"}</strong>
        </p>

        {/* Tag input UI */}
        <div style={{ marginTop: 16 }}>
          <label>
            New tag:
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              style={{ marginLeft: 8 }}
            />
          </label>
          <button
            type="button"
            style={{ marginLeft: 8 }}
            onClick={() => {
              if (newTag.trim() !== "") {
                tags.push(newTag.trim());
                //setNewTag("");
              
                // Something unexpected happened when I tried this: the tag didn’t show up until the next update.

              }
          
            }}
          >
            Add tag
          </button>
        </div>

        {/* Tag list display */}
        {tags.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>Tags:</strong>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        )}

        {error ? <div className="alert">{error}</div> : null}

        <div className="row gap">
          <button className="btn" disabled={saving}>Create</button>
          <Link className="btn secondary" to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

/*
-----------------------------------------
LAB 2 REQUIRED REFLECTION COMMENTS
-----------------------------------------

What happens to the UI when a tag is added?
- The new tag shows up in the list immediately because React re-renders when state changes.

What data changed when I clicked "Add tag"?
- The tags array changed by adding the new tag to the end.

Did I manually update the list in the UI?
- No, React handled the UI update automatically once the state changed.

Part 5 Reflection:
- One thing that surprised me about lists was how the UI didn’t update when I changed the array directly.
- One thing that felt similar to last week was using state to track changes and update the UI.
- One question I have is how React decides when to re-render list-based state.
*/