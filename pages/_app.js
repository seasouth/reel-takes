import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import '@/styles/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    background: "#f7df1e",
    color: "#24292e",
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: 'black',
            borderRadius: '8px'
          }
        }
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            maxHeight: '30%'
          }
        }
      },
    }
});

export default function App({ Component, pageProps }) {
  return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    )
}