import { useEffect, useState } from "react";
import ListView from "./pages/ListView.jsx"; import NewView from "./pages/NewPage.jsx";
import { loadItems, saveItems } from "./storage.js";

function App() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("loading"); // "loading" | "list" | "new"
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Effect A: load once on startup
  useEffect(() => {
    const saved = loadItems();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(saved);
    setView("list");
    setIsLoading(false);
  }, []);

  // Effect B: save whenever items change
  useEffect(() => {
    if (isLoading) return; // skip first load
    saveItems(items);
  }, [items, isLoading]);

  // Effect C: reflect app state outside React (document title)
  useEffect(() => {
    document.title = `Items: ${items.length}`;
  }, [items.length]);

  const addItem = (title) => {
    const clean = title.trim();
    if (!clean) return;

    // Prevent duplicates (case-insensitive)
    const exists = items.some(
      (it) => it.title.toLowerCase() === clean.toLowerCase()
    );
    if (exists) return;

    setItems((prev) => {
      const maxId = prev.reduce((m, it) => Math.max(m, it.id), 0);
      return [...prev, { id: maxId + 1, title: clean }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const clearAll = () => {
    setItems([]);
    setSelectedId(null);
    setView("list");
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Week 5 Demo</h1>

      <button onClick={() => setView("list")}>List</button>
      <button onClick={() => setView("new")}>New</button>
      <button onClick={clearAll}>Clear All</button>

      <hr />

      {view === "list" && (
        <ListView
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onRemove={removeItem}
        />
      )}

      {view === "new" && (
        <NewView
          onSave={(title) => {
            addItem(title);
            setView("list");
          }}
        />
      )}
    </div>
  );
}

export default App;
