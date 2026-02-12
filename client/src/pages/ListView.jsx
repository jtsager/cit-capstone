function ListView({ items, selectedId, onSelect, onRemove }) {
  return (
    <div>
      <h2>List View</h2>

      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <button onClick={() => onSelect(it.id)}>
                {selectedId === it.id ? "Selected" : "Select"}
              </button>{" "}
              {it.title}{" "}
              <button onClick={() => onRemove(it.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "12px" }}>
        Selected id: <strong>{selectedId ?? "none"}</strong>
      </p>
    </div>
  );
}

export default ListView;
