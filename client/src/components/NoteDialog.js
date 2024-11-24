import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function NoteDialog({ note, open, onSave, onClose }) {
    const [updatedNote, setUpdatedNote] = useState(note);

    useEffect(() => {
        setUpdatedNote(note);
    }, [note]);

    function handleChange(e) {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
    }

    function handleSave() {
        onSave(updatedNote);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{marginBottom:'10px'}}>Edit Note</DialogTitle>
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}