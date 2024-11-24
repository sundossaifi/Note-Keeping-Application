import { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteNote } from '../api';

export default function NoteCard({ note, onDelete, onEdit }) {
    const [isHovered, setIsHovered] = useState(false);

    async function handleDelete(e) {
        e.stopPropagation();
        const confirmDelete = window.confirm(
            "Are you sure You want to delete " + note.title
        );
        if (!confirmDelete) return;
        try {
            await deleteNote(note._id)
            onDelete(note._id)
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    function handleEdit() {
        onEdit(note);
    }

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ width: 250, position: 'relative', cursor: 'pointer' }}
            onClick={handleEdit}
        >
            <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>
                <Typography variant="caption">{note.creationDate}</Typography>
            </CardContent>

            {isHovered && (
                <IconButton
                    sx={{ position: 'absolute', bottom: 5, right: 5 }}
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </Card>
    );
}