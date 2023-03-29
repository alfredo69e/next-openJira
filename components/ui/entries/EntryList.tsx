import React, { DragEvent, FC, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '@/interfaces';
import { useContext } from 'react';
import { EntriesContext, UIContext } from './../../../context';
import style from './EntryList.module.css';

interface props {
  status: EntryStatus;
}

export const EntryList: FC<props> = ({ status }) => {

  const { entries, onEntryUpdate } = useContext( EntriesContext );

  const { isDragging, setDragging } = useContext( UIContext );

  const entriesByStatus = useMemo(() => entries?.filter(( entry ) => entry.status === status ), [ entries ]);

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  }

  const onDropEntry = ({ dataTransfer }: DragEvent<HTMLDivElement> ) => {
    const id = dataTransfer.getData('text');
    
    const entry = entries.find(( entry ) => entry._id === id )!;
    entry.status = status;
    onEntryUpdate( entry );
    setDragging( false );
  }

  return (
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? style.dragging : '' }
    >
        <Paper sx={{ height: 'calc( 100vh - 150px )', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 5px' }}>
          <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
              {
                entriesByStatus?.map(({ _id, ...entry }) => (
                  <EntryCard key={ _id }  entry={{ _id, ...entry }} />
                ))
              }
          </List>  
        </Paper>
    </div>
  )
}
