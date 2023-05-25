import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, InputBase, TextField, Toolbar, Typography, Box, Button, ButtonGroup } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import { logoutUser } from '@/src/reducer/auth/authActions';
import DashboardSearch from '@/src/components/DashboardSearch';
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

const DashboardHeader = () => {

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
                            <DashboardSearch />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
};

export default DashboardHeader;