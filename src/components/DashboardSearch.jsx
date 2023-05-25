import React, { useState, useEffect } from 'react';
import { AppBar, InputBase, InputAdornment, TextField, Toolbar, Typography, Box, Button, ButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useStore } from '@/src/hooks/useStore';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transition: theme.transitions.create('width'),
    width: '30%',
    '&:focus-within': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      transition: theme.transitions.create('width'),
      width: '60%'
    },
    marginLeft: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: '8px',
    marginRight: '8px',
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',

    },
}));

const DashboardSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchValue, setSearchValue] = useStore((state) => [state.searchValue, state.setSearchValue]);
    const [showSearchResults, setShowSearchResults] = useStore((state) => 
        [state.showSearchResults, state.setShowSearchResults]
    );

    useEffect(() => {
        setSearchValue(searchQuery);
    }, [showSearchResults]);

    useEffect(() => {
        if (showSearchResults && searchQuery?.length === 0) {
            setShowSearchResults(false);
        }
    }, [searchValue]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setShowSearchResults(true);
        }
    }

    const handleBlur = () => {
        if (showSearchResults && searchQuery?.length === 0) {
            setShowSearchResults(false);
            setSearchValue(searchQuery);
        }
    }

    const handleClear = () => {
        setSearchQuery("");
        setSearchValue("");
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton 
                            aria-label="clear search" 
                            onClick={handleClear}
                        >
                            <ClearIcon sx={{color: 'whitesmoke'}} />
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{ 
                    'aria-label': 'search',
                }}
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
        </Search>
    )
}

export default DashboardSearch;