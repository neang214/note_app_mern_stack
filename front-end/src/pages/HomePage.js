// src/App.js or src/pages/HomePage.js
import { useEffect } from 'react';
import NoteItem from '../components/NoteItem'; // fixed typo: componnents → components
import { useNoteStore } from '../store/useNoteStore';
import AddNoteForm from '../components/AddNoteForm';
import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = 'http://localhost:8000';

const App = () => {
  const { notes, getNotes, createNote, updateNote, deleteNote, subscribeToNotes, unsubscribeFromNotes } = useNoteStore();
  const { socket } = useAuthStore();

  useEffect(() => {
    if (!socket) return; // wait for socket to exist

    subscribeToNotes(); // attach listeners
    getNotes();         // fetch initial notes

    return () => unsubscribeFromNotes(); // cleanup
  }, [socket]); // runs only when socket is ready or changes

  console.log('page refreshed')

  const handleAddNote = async (newNoteData) => {
    await createNote(newNoteData);
  };

  const handleRemoveNote = async (id) => {
    await deleteNote(id);
  };

  const handleUpdateNote = async (id, updatedNote) => {
    await updateNote(id, updatedNote);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans p-4 sm:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-600">
            Premium Note Vault
          </span>
        </h1>
        <p className="mt-2 text-xl text-gray-400">
          Your secure, high-priority dashboard for insights and data.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <AddNoteForm onAdd={handleAddNote} />
        </section>

        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-200">
              Active Notes ({notes.length})
            </h2>
            <div className="text-sm text-gray-500">
              <span className="text-fuchsia-400">●</span> Real-time + Backend Sync
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="p-10 text-center bg-gray-800 rounded-xl border border-dashed border-gray-700 text-gray-500">
              No notes found. Click "Add New Premium Note" to get started!
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  onRemove={handleRemoveNote}
                  onUpdateNote={handleUpdateNote}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;