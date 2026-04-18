// src/components/AddNoteForm.js
import { useState } from "react";

const AddNoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const submitDisabled = !title.trim() || !noteContent.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitDisabled) return;

    onAdd({ title: title.trim(), note: noteContent.trim() });
    setTitle("");
    setNoteContent("");
    setIsAdding(false);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-fuchsia-500/30">
      <h3 className="text-2xl font-semibold text-white mb-4">
        {isAdding ? "Create New Note" : "Manage Notes"}
      </h3>

      {!isAdding && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-semibold rounded-xl transition duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl shadow-fuchsia-500/40"
        >
          Add New Premium Note
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Note Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Q3 Strategy Review"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150"
              maxLength={50}
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">
              Details
            </label>
            <textarea
              id="note"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter your detailed notes here..."
              rows="4"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150 resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitDisabled}
              className="py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Note
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNoteForm;