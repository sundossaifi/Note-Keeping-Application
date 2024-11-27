import { AppBar, Toolbar, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './NavBar.module.css';
import { useNotes } from '../../context/NotesContext';

export default function NavBar() {
    const { handleSearchNotes } = useNotes();

    function handleSearch(e) {
        const queryValue = e.target.value.trim();
        handleSearchNotes(queryValue);
    }

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ 'backgroundColor': "white", 'color': 'black' }}>
                <div className={styles.toolBarContainer}>
                    <Typography variant='h5'>
                        My Note Keeper
                    </Typography>
                    <TextField
                        size='small'
                        hiddenLabel
                        placeholder='search'
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            },
                        }}
                        sx={{ marginBottom: '5px', width: '30%', backgroundColor: '#f2f3f5' }}
                        onChange={handleSearch}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}