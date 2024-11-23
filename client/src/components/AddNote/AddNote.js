import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import styles from './AddNote.module.css'

export default function AddNote() {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
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
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Content"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ marginBottom: '10px' }}
                        />
                        <Button color="primary" variant="contained" sx={{ marginRight: '10px' }}>
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