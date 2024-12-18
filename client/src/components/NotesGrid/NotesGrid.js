import { Grid2 } from '@mui/material';
import NoteCard from '../NoteCard';
import styles from './NotesGrid.module.css'

export default function NotesGrid({ notes, onDelete ,onEdit }) {
    return (
        <div className={styles.container}>
            <Grid2 container spacing={1} alignItems={'center'} sx={{ width: '80%' }}>
                {notes.map((note, index) => (
                    <Grid2 key={index} size={{ md: 3 }}>
                        <NoteCard note={note} onDelete={onDelete} onEdit={onEdit} />
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
}