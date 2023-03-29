

import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { UIContext } from '@/context';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafs']

export const DrawerSideBar = () => {

  const { sideMenuOpen, closedSideMenu } = useContext( UIContext );

  return (
    <Drawer
        anchor='left'
        open={ sideMenuOpen }
        onClose={ closedSideMenu }
    >

    <Box sx={{
            padding: '5px 10px',
            width: 300
        }}
    >
        <Typography variant='h4' > Menu </Typography>
    </Box>

      <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={ index }> 
                  <ListItemIcon>
                      { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                  </ListItemIcon>
                  <ListItemText> { text } </ListItemText>
              </ListItem>
            ))
          }
      </List>
      
      <Divider/>

      <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={ index }> 
                  <ListItemIcon>
                      { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                  </ListItemIcon>
                  <ListItemText> { text } </ListItemText>
              </ListItem>
            ))
          }
      </List>
    </Drawer>
  )
}
