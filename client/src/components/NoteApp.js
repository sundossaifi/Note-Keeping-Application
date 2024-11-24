import NavBar from './NavBar/NavBar';
import NotesGrid from './NotesGrid/NotesGrid';
import AddNote from './AddNote/AddNote';
import NoteDialog from './NoteDialog';
import styles from '../styles/NoteApp.module.css'
import { useState, useEffect } from 'react';
import { fetchNotes, searchNotes, updateNote } from '../api';
import { Button } from '@mui/material';

export default function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedNote, setSelectedNote] = useState({ title: '', content: '' });
    const [openDialog, setOpenDialog] = useState(false);
    // const [page, setPage] = useState(1);
    // const [limit] = useState(2);

    async function getNotes() {
        try {
            const notesData = await fetchNotes();
            setNotes(notesData)
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {
        getNotes();
    }, [])

    // function goToNextPage() {
    //     setPage(page + 1);
    // }

    // function goToPreviousPage() {
    //     if (page > 1) {
    //         setPage(page - 1);
    //     }
    // }

    function handleDelete(id) {
        setNotes(notes.filter((note) => note._id !== id))
    }

    async function handleSearchNotes(query) {
        console.log('hello');
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
    }

    function handleAddNote(note) {
        setNotes([note, ...notes])
    }

    function handleEdit(note) {
        setSelectedNote(note);
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    async function handleSaveUpdatedNote(updatedNote) {
        try {
            const data = await updateNote(updatedNote._id, updatedNote);
            const updatedNotes = notes.map((note) =>
                note._id === data._id ? data : note
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error saving updated note:', error);
        }
    }

    return (
        <>
            <NavBar onSearchNotes={handleSearchNotes} />
            <AddNote onAddNote={handleAddNote} />
            <NotesGrid notes={searchResults.length > 0 ? searchResults : notes} onDelete={handleDelete} onEdit={handleEdit} />
            {/* <div className={styles.btncontainer}>
                <Button
                    onClick={goToPreviousPage}
                    disabled={page === 1}
                    variant="outlined"
                >
                    Previous
                </Button>
                <Button
                    onClick={goToNextPage}
                    variant="outlined"
                >
                    Next
                </Button>
            </div> */}
            <NoteDialog
                note={selectedNote}
                open={openDialog}
                onSave={handleSaveUpdatedNote}
                onClose={handleCloseDialog}
            />
        </>
    );
}