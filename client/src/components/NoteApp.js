import { useNotes } from '../context/NotesContext';
import NavBar from './NavBar/NavBar';
import NotesGrid from './NotesGrid/NotesGrid';
import AddNote from './AddNote/AddNote';
import NoteDialog from './NoteDialog';

export default function NoteApp() {
    const {
        notes,
        searchResults,
        selectedNote,
        openDialog,
        handleAddNote,
        handleSearchNotes,
        handleDeleteNote,
        handleEditNote,
        handleSaveUpdatedNote,
        handleCloseDialog
    } = useNotes();

    return (
        <>
            <NavBar onSearchNotes={handleSearchNotes} />
            <AddNote onAddNote={handleAddNote} />
            <NotesGrid notes={searchResults.length > 0 ? searchResults : notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
            <NoteDialog
                note={selectedNote}
                open={openDialog}
                onSave={handleSaveUpdatedNote}
                onClose={handleCloseDialog}
            />
        </>
    );
}
