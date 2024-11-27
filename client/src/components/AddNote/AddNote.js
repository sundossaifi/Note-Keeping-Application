import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNotes } from '../../context/NotesContext';
import styles from './AddNote.module.css';

export default function AddNote() {
    const { handleAddNote } = useNotes();
    const [isExpanded, setIsExpanded] = useState(false);
    const [note, setNote] = useState({ title: '', content: '' });

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
        setNote({ title: '', content: '' });
    }

    function handleChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        if (!note.title.trim() || !note.content.trim()) {
            console.log('Title or Content cannot be empty');
            return;
        }
        try {
            handleAddNote(note); 
            setNote({ title: '', content: '' });
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    return (
        <div className={styles.container}>
            <Card sx={{ width: '40%', margin: '20px 50px', padding: '5px' }}>
                {!isExpanded ? (
                    <Typography variant='h6' onClick={handleToggleExpand} sx={{ cursor: 'pointer' }}>Take a note...</Typography>
                ) : (
                    <CardContent>
                        <TextField
                            label="Title"
                            name='title'
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                            value={note.title}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Content"
                            name='content'
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ marginBottom: '10px' }}
                            value={note.content}
                            onChange={handleChange}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ marginRight: '10px' }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button onClick={handleToggleExpand} color="secondary" variant="outlined">
                            Close
                        </Button>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
