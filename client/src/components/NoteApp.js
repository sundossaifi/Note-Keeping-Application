import NavBar from './NavBar/NavBar';
import NotesGrid from './NotesGrid/NotesGrid';
import AddNote from './AddNote/AddNote';
import styles from '../styles/NoteApp.module.css'
import { useState, useEffect } from 'react';
import { fetchNotes, searchNotes } from '../api';
import { Button } from '@mui/material';

export default function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
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

    return (
        <>
            <NavBar onSearchNotes={handleSearchNotes} />
            <AddNote />
            <NotesGrid notes={searchResults.length > 0 ? searchResults : notes} onDelete={handleDelete} />
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
        </>
    );
}