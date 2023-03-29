import { FC, DragEvent, useContext } from 'react';
import { Entry } from '@/interfaces';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { UIContext } from '@/context';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../../utils';

interface props {
  entry: Entry
}

export const EntryCard: FC<props> = ({ entry }) => {

  const router = useRouter();

  const { setDragging } = useContext( UIContext );

  const { description, createdAt } = entry;
  
  const onDragStart = ( { dataTransfer }: DragEvent ) => {

    dataTransfer.setData('text', entry._id );

    setDragging( true );
    
  }
  const onDragEnd = () => {
    setDragging( false );
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`)
  }

  return (
    <Card sx={{ marginBottom: 1 }} 
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
      onClick={ onClick }
    >

      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}> { description } </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'> { dateFunctions.geFormatDistanceToNow( createdAt ) } </Typography>
        </CardActions>
      </CardActionArea> 

    </Card>
  );
}
