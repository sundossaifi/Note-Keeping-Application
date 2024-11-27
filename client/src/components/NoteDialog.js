import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useNotes } from '../context/NotesContext'; 

export default function NoteDialog() {
    const { selectedNote, openDialog, handleSaveUpdatedNote, handleCloseDialog } = useNotes();
    const [updatedNote, setUpdatedNote] = useState(selectedNote);

    useEffect(() => {
        setUpdatedNote(selectedNote);
    }, [selectedNote]);

    function handleChange(e) {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
    }

    function handleSave() {
        handleSaveUpdatedNote(updatedNote);
        handleCloseDialog(); 
    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ marginBottom: '10px' }}>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={updatedNote.title}
                    onChange={handleChange}
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    name="content"
                    label="Content"
                    variant="outlined"
                    fullWidth
                    value={updatedNote.content}
                    onChange={handleChange}
                    sx={{ marginBottom: '10px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
