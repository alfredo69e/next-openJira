import { Entry } from '@/interfaces';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';
import { entriesAPi } from '@/apis';
import { useSnackbar } from 'notistack';


export interface EntriesState {
    entries: Entry[];
}

interface props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE);

    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {

        const { data } = await entriesAPi.post<Entry>( '/entries', { description } );

        dispatch({ type: '[Entry] - Add-Entry', payload: data });
    }

    const onEntryUpdate = async ( { description, status, _id }: Entry, showSnabar = false ) => {

        try {
            const { data } = await entriesAPi.patch<Entry>(`entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] - Update-Entry', payload: data });

             if( showSnabar ) {
                enqueueSnackbar('Update Data', {
                    variant: 'success',
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
             }
             

        } catch ( err ) {
            console.log( err );
            
        }
    }

    const refreshEntries = async () => {
      const { data } = await entriesAPi.get<Entry[]>('/entries');
      
      dispatch({ type: '[Entry] - loadData-Entry', payload: data })
    }

    useEffect(() => {
      refreshEntries();
    }, [])
    

return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        onEntryUpdate,
    }}>
        { children }
    </EntriesContext.Provider>
  )
}