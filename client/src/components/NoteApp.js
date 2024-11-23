import NavBar from './NavBar/NavBar';
import NotesGrid from './NotesGrid/NotesGrid';
import AddNote from './AddNote/AddNote';
import styles from '../styles/NoteApp.module.css'
import { useState, useEffect } from 'react';
import { fetchNotes } from '../api';
import { Button } from '@mui/material';

export default function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);

    async function getNotes() {
        try {
            const notesData = await fetchNotes(page, limit);
            setNotes(notesData)
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {
        getNotes();
    }, [page, limit])

    const goToNextPage = () => {
        setPage(page + 1);
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1); 
        }
    };

    return (
        <>
            <NavBar />
            <AddNote />
            <NotesGrid notes={notes} />
            <div className={styles.btncontainer}>
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
            </div>
        </>
    );
}