
import React, { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from '@/components';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryStatus } from '@/interfaces';
import { dbEntries } from '@/db';
import { Entry } from '../../interfaces/entries/entriy.interface';
import { entriesAPi } from '@/apis';
import { EntriesContext } from '@/context';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

const validstatus: EntryStatus[] = [ 'Pending', 'In-Progress', 'Completed' ];

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ( { entry  } ) => {

    const { onEntryUpdate } = useContext( EntriesContext );

    const router = useRouter();

    const { description, status: statusEntry, createdAt } = entry;

    const [inputValue, setInputValue] = useState( description );

    const [status, setStatus] = useState<EntryStatus>( statusEntry );

    const [touch, setTouch] = useState( false );

    const onTextFieldChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue( target.value );
    }

    const onStatusChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setStatus( target.value as EntryStatus );
    }

    const onSave = () => {
        if( inputValue.trim().length === 0 ) return;

        const updateEntry: Entry = {
            ...entry,
            description: inputValue,
            status,
        }

        onEntryUpdate( updateEntry, true );

        router.back();

    }

    const isNotValied = useMemo(() => inputValue.length <= 0 && touch, [ inputValue, touch  ]);

    


  return (
    <Layout  title={ inputValue.substring(0, 10) + '...' }>
        <Grid 
            container
            justifyContent={'center'}
            sx={{ marginTop: 2 }}    
        >
            <Grid item 
                xs={ 12 } sm={ 8 } md={ 6 }
            >
                <Card>
                    <CardHeader 
                        title={`Entrada: ${ description }`} 
                        subheader={`Creada: ${ dateFunctions.geFormatDistanceToNow( createdAt ) }`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder='New Entry'
                            autoFocus
                            multiline
                            label={'New Entry'}
                            value={ inputValue }
                            onChange={ onTextFieldChange }
                            helperText={ isNotValied ? 'Enter a valor' : '' }
                            error={ isNotValied }
                            onBlur={ () => setTouch( true ) }
                        />
                        <FormControl>
                            <FormLabel>
                                State: 
                            </FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChange }
                            >
                                {
                                    validstatus.map((text) => (
                                        <FormControlLabel 
                                            key={ text } 
                                            value={ text } 
                                            control={ <Radio />}
                                            label={ text }
                                            />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant='contained'
                            startIcon={ <SaveAsOutlinedIcon /> }
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>

            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.main'
                }}
               
            >
                <DeleteOutlinedIcon />
            </IconButton>

        </Grid>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   
    const { uid } = params as { uid: string };

    const entry = await dbEntries.getEntryById( uid )

    if( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            entry
        }
    }
}


export default EntryPage;