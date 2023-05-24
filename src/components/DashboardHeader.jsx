import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { ThemeProvider, createTheme, styled, alpha } from '@mui/material/styles';
import { AppBar, InputBase, TextField, Toolbar, Typography, Box, Button, ButtonGroup } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import { logoutUser } from '@/src/reducer/auth/authActions';
import NewUser from '@/src/components/User/NewUser';
import Login from '@/src/components/User/Login';
import { useStore } from '@/src/hooks/useStore'

import styles from '@/styles/DashboardHeader.module.css'

const theme = createTheme({
    palette: {
        auth: {
          main: "#b8860b",
          contrastText: "#fff"
        }
    },
    background: "#f7df1e",
    color: "#24292e",
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'black',
                    paddingLeft: '0px !important'
                }
            }
        }
    }
});

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
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',

    },
}));

const DashboardHeader = () => {
    const [searchValue, setSearchValue] = useStore((state) => [state.searchValue, state.setSearchValue]);
    //const [showSearchResults, setShowSearchResults] = useStore((state) => [state.showSearchResults, state.setShowSearchResults]);
    const setShowSearchResults = useStore((state) => state.setShowSearchResults);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log(searchValue);

            setShowSearchResults(true);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Image
                            src="/reel.svg"
                            alt="Reel Logo"
                            width={50}
                            height={24}
                            priority
                        />
                        <div style={{display: 'contents'}}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}}>
                                <div className={styles.headerTitle}>Reel Takes</div>
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchValue}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </Search>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
};

export default DashboardHeader;