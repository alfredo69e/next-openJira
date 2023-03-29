import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import '@/styles/globals.css';

import { lightTheme, darkTheme } from './../themes';
import { UIProvider } from '@/context';
import { EntriesProvider } from '@/context/entries';
import { SnackbarProvider } from 'notistack';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={ lightTheme }>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
