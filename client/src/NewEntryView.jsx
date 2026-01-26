function NewEntryView({ inputText, setInputText }) {
  return (
    <div>
      <h2>New Entry View</h2>
      <p>Type something to test persistence:</p>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here..."
      />
    </div>
  );
}

export default NewEntryView;
