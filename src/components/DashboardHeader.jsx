import React from 'react';
import Image from 'next/image'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { connect } from 'react-redux';
import { logoutUser } from '@/src/reducer/auth/authActions';
import NewUser from '@/src/components/User/NewUser';
import Login from '@/src/components/User/Login';
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <div className={styles.headerTitle}>Reel Talk</div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
};

export default DashboardHeader;