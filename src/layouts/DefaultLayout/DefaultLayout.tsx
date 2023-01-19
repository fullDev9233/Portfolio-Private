import { Box, CssBaseline } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from '../../components/AppBar';
import Drawer from '../../components/SidebarDrawer';
import { AppDispatch } from '../../store';
import { toggleSidebar } from '../../store/sidebar/actions';
import { MainBox } from './styles';

const DefaultLayout = ({ children }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== '/login') dispatch(toggleSidebar(false));
  }, [dispatch, pathname]);

  const toggleDrawer = () => {
    dispatch(toggleSidebar(!open));
    setOpen(!open);
  };

  return pathname === '/login' ? (
    <>{children}</>
  ) : (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar toggleDrawer={toggleDrawer} isOpen={open} />
      <Drawer toggleDrawer={toggleDrawer} isOpen={open} />
      <MainBox
        component='main'
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        }}
      >
        {children}
      </MainBox>
    </Box>
  );
};

export default DefaultLayout;
