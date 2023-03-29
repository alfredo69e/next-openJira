import { NextPage } from 'next';

import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import { EntryList, Layout, NewEntry } from '@/components';


const HomePage: NextPage = () => {
  return (
 
     <Layout title='Home-OpenJira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title='Pending' />
            <CardContent>
              <NewEntry />
              <EntryList status={ 'Pending' } />
            </CardContent>
          </Card>

        </Grid>
        
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title='In Progress' />
            <CardContent>
              <EntryList status={ 'In-Progress' } />
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title='Completed' />
            <CardContent>
              <EntryList status={ 'Completed' } /> 
            </CardContent>
          </Card>

        </Grid>

      </Grid>
     </Layout>

  )
}


export default HomePage;