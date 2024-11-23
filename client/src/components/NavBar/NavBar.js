import { AppBar, Toolbar, Typography, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styles from './NavBar.module.css';
import { useState } from 'react';

export default function NavBar({ onSearchNotes }) {
    const [query, setQuery] = useState('');

    function handleSearch(e) {
        const queryValue = e.target.value.trim();
        setQuery(queryValue);
        onSearchNotes(queryValue);
    }


    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ 'backgroundColor': "white", 'color': 'black' }}>
                <div className={styles.toolBarContainer}>
                    <Typography variant='h5'>
                        My Note Keeper
                    </Typography>
                    <TextField
                        value={query}
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