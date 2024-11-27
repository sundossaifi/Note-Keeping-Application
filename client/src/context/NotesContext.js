import { createContext, useContext, useState, useEffect } from 'react';
import { fetchNotes, addNote, searchNotes, updateNote, deleteNote } from '../api';

const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedNote, setSelectedNote] = useState({ title: '', content: '' });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        async function getNotes() {
            try {
                const notesData = await fetchNotes();
                setNotes(notesData);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }
        getNotes();
    }, []);

    const handleAddNote = async (note) => {
        try {
            const newNote = await addNote(note);
            setNotes([newNote, ...notes]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleSearchNotes = async (query) => {
        if (query) {
            try {
                const results = await searchNotes(query);
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching notes:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setOpenDialog(true);
    };

    const handleSaveUpdatedNote = async (updatedNote) => {
        try {
            const data = await updateNote(updatedNote._id, updatedNote);
            const updatedNotes = notes.map((note) =>
                note._id === data._id ? data : note
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error saving updated note:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                searchResults,
                selectedNote,
                openDialog,
                handleAddNote,
                handleSearchNotes,
                handleDeleteNote,
                handleEditNote,
                handleSaveUpdatedNote,
                handleCloseDialog,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    return useContext(NotesContext);
}
