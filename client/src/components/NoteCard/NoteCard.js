import{ useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteCard({ note }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ width: 250, position: 'relative', cursor:'pointer' }}
        >
            <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>
                <Typography variant="caption">{note.date}</Typography>
            </CardContent>

            {isHovered && (
                <IconButton
                    sx={{ position: 'absolute', bottom: 5, right: 5 }}
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </Card>
    );
}