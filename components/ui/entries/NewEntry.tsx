
import React, { ChangeEvent, useState } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Box, Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { EntriesContext, UIContext } from '@/context';

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext( EntriesContext );

    const { isAddingEntry, setAddingEntry } = useContext( UIContext );


    const onTextFieldChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue( target.value );
    }

    const onSave = () => {
        if( inputValue.length === 0 ) return;

        addNewEntry( inputValue );

        setTouched( false );

        setInputValue( '' );

        setAddingEntry( false );
        
    }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

        {
            ( isAddingEntry ) 
            ?  <>
             <TextField 
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                autoFocus
                multiline
                label={'New Entry'}
                helperText={ inputValue.length <= 0 && touched && ' Enter a Valor'}
                value={ inputValue }
                onChange={ onTextFieldChange }
                error={ inputValue.length <= 0 && touched }
                onBlur={ () => setTouched( true ) }
                />
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Button
                        variant='text'
                        onClick={ () => setAddingEntry( false ) }
                    >
                    Cancel 
                    </Button>
                    <Button
                        variant='outlined'
                        color={'secondary'}
                        endIcon={ <SaveOutlinedIcon /> }
                        onClick={ onSave }
                    >
                    Save 
                    </Button>
                </Box>
            </>
            :  <Button
                    variant='outlined'
                    startIcon={ <AddCircleOutlinedIcon /> }
                    fullWidth
                    onClick={() => setAddingEntry( true )}
                >
                Add Task
            </Button>

        }
       
       

       
        
    </Box>
  )
}
