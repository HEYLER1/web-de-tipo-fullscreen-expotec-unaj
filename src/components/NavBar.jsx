import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from './image/expo.png';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'INICIO', path: '/', icon: <HomeIcon /> },
    { text: 'BASES', path: '/bases', icon: <DescriptionIcon /> },
    { text: 'INSCRIPCION', path: '/inscripcion', icon: <AssignmentIcon /> },
    { text: 'AGENDA', path: '/agenda', icon: <CalendarTodayIcon /> },
    { text: 'CONTACTO', path: '/contacto', icon: <ContactMailIcon /> },
    { text: 'PERFIL', path: '/perfil', icon: <PeopleIcon /> },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#002147', boxShadow: 'none' }}>
        <Toolbar>
          {isSmallScreen ? (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', backgroundColor: "#002147", ml: 2 }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: '100px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}
          <div style={{ flexGrow: 1 }} />
          {!isSmallScreen && (
            menuItems.map(({ text, path }) => (
              <Button
                key={text}
                color="inherit"
                component={Link}
                to={path}
                sx={{
                  padding: '10px 20px',
                  backgroundColor: location.pathname === path ? '#004080' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#003366',
                    color: '#ffffff',
                  },
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                {text}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>

      {isSmallScreen && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: 'none',
              '& .MuiDrawer-paper': {
                background: 'transparent',
              }
            }
          }}
          sx={{
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(0, 33, 71, 0.95) 0%, rgba(0, 33, 71, 0.85) 100%)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
                padding: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: '80%',
                  maxWidth: '120px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <List sx={{ 
              width: 250,
              padding: '16px 0',
            }}>
              {menuItems.map(({ text, path, icon }) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    margin: '4px 8px',
                    borderRadius: '8px',
                    color: '#ffffff',
                    backgroundColor: location.pathname === path 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: '35px',
                    color: '#ffffff',
                  }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={text} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
