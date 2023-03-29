

import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '@/context';
import NextLink from 'next/link';


export const NavBar = () => {


  const { openSideMenu } = useContext( UIContext )

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                sx={{ color: '#ffffff' }}
                onClick={ openSideMenu }
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href='/' passHref>
              
                <Typography variant='h6' color={'white'}> Open Jira </Typography>
          
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
