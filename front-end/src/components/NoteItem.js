// src/components/NoteItem.js
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const NoteItem = ({ note, onRemove, onUpdateNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note?.title || "");
  const [editNote, setEditNote] = useState(note?.note || "");

  const submitDisabled = !editTitle.trim() || !editNote.trim();

  const handleToggleExpand = () => {
    if (!isExpanded) {
      setEditTitle(note.title);
      setEditNote(note.note);
    }
    setIsExpanded(!isExpanded);
    setIsEditing(false); // collapse editing when closing
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (submitDisabled) return;

    onUpdateNote(note._id, {
      title: editTitle.trim(),
      note: editNote.trim(),
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(note.title);
    setEditNote(note.note);
    setIsEditing(false);
  };

  const formatRelativeTime = (dateInput) => {
    if (!dateInput) return "N/A";
    const date = new Date(dateInput);
    if (isNaN(date)) return "Invalid date";

    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 2592000)}mo ago`;
  };

  const containerClasses = `
    bg-gray-800/70 p-6 rounded-2xl shadow-xl border border-gray-700/50 
    transition-all duration-300 ease-in-out cursor-pointer 
    ${isExpanded ? "bg-gray-800/90 border-fuchsia-500/80 shadow-2xl scale-[1.01]" : "hover:scale-[1.01] hover:shadow-2xl hover:border-fuchsia-500/50"}
  `;

  return (
    <div className={containerClasses} onClick={() => !isExpanded && handleToggleExpand()}>
      <div className="flex justify-between items-center mb-3">
        {!isEditing ? (
          <h3 className="text-xl font-bold text-fuchsia-400 capitalize truncate w-10/12">
            {note.title}
          </h3>
        ) : (
          <h3 className="text-xl font-bold text-fuchsia-400 capitalize w-10/12">Editing...</h3>
        )}

        <div className="flex items-center space-x-2">
          {/* Delete Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(note._id);
            }}
            className="text-gray-400 hover:text-red-500 transition p-1 rounded-full bg-gray-700/50 hover:bg-red-900/40"
          >
            <X size={20} />
          </button>

          {/* Expand/Collapse Button - THIS WAS THE MAIN BUG */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleExpand();
            }}
            className="text-gray-400 hover:text-violet-500 transition p-1 rounded-full bg-gray-700/50 hover:bg-violet-900/40"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Collapsed View */}
      {!isExpanded && (
        <div className="mt-1">
          <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-3">
            {note.note}
          </p>
          <div className="text-gray-500 text-xs font-medium pt-1">
            Created: {formatRelativeTime(note.createdAt)}
          </div>
        </div>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-4 border-t border-gray-700 pt-4" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                maxLength={50}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Title"
              />
              <textarea
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                rows={6}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
                placeholder="Note content..."
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="text-gray-500 text-xs mb-3">
                Created: {formatRelativeTime(note.createdAt)}
              </div>
              <div className="text-gray-400 text-sm mb-4">ID: {note._id}</div>
              <p className="text-md leading-relaxed text-gray-300 whitespace-pre-wrap">{note.note}</p>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
                >
                  Edit Note
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteItem;