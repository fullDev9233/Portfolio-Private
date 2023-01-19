import { Box, Grid, IconButton, Popover, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import AboutDialog from '../AboutDialog';
import ConfirmLogout from '../Common/ConfirmDelete';
import LanguageSelector from '../LanguageSelector';
import { logoutUser } from '../../store/user/actions';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { AppBar, FlexBox } from './styles';
import UserIcon from '../../assets/UserIcon';
import SettingIcon from '../../assets/SettingIcon';

const AppBarContent = ({
  toggleDrawer,
  isOpen,
}: {
  toggleDrawer: () => void;
  isOpen: boolean;
}) => {
  const t = useSelector(selectTranslations);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElSetting, setAnchorElSetting] = useState<HTMLButtonElement | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isOpenAbout, setIsOpenAbout] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleConfirm = () => {
    setConfirmOpen(!confirmOpen);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'setting-popover' : undefined;

  const handleSettingClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElSetting(event.currentTarget);
  };

  const handleSettingClose = () => {
    setAnchorElSetting(null);
  };

  const aboutHandler = useCallback(() => {
    setIsOpenAbout((prev) => !prev);
    setAnchorElSetting(null);
  }, []);

  const openOfSetting = Boolean(anchorElSetting);
  const idOfSetting = openOfSetting ? 'about-popover' : undefined;

  const closeAboutHandler = useCallback(() => {
    setIsOpenAbout(false);
  }, []);

  return (
    <AppBar
      position='absolute'
      open={isOpen}
      sx={{ boxShadow: 'none', border: (theme) => `1px solid ${theme.palette.gray.light}` }}
    >
      <Toolbar
        sx={{
          pl: '0px !important',
          pr: '0px !important', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={() => toggleDrawer()}
          sx={{
            marginRight: '36px',
            ...(isOpen && { display: 'none' }),
          }}
        >
          <div style={{ width: 40, height: 40 }}></div>
        </IconButton>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          sx={{ margin: 0, padding: 0 }}
        >
          <Grid item sx={{ mr: '40px' }}>
            <LanguageSelector />
          </Grid>
          <Grid item sx={{ mr: '30px' }}>
            <SettingIcon sx={{ cursor: 'pointer' }} onClick={handleSettingClick} />
            <Popover
              id={idOfSetting}
              open={openOfSetting}
              anchorEl={anchorElSetting}
              onClose={handleSettingClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                zIndex: 20000,
                '& .MuiPaper-root.MuiPopover-paper': {
                  width: '170px',
                  top: '45px !important',
                  right: '81px !important',
                  left: 'auto !important',
                  boxShadow: '0px 2px 6px #00000033',
                },
              }}
            >
              <Box
                sx={{
                  padding: '10px 0',
                  background: (theme) => theme.palette.white.dark,
                  boxShadow: '0px 2px 6px #00000033',
                  borderRadius: 1,
                }}
              >
                <FlexBox onClick={aboutHandler}>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: (theme) => theme.palette.black.light }}
                  >
                    {handleTranslations(t, 'About')}
                  </Typography>
                </FlexBox>
              </Box>
            </Popover>
          </Grid>
          <Grid item>
            <UserIcon aria-describedby={id} sx={{ cursor: 'pointer' }} onClick={handleClick} />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                zIndex: 20000,
                '& .MuiPaper-root.MuiPopover-paper': {
                  width: '210px',
                  top: '45px !important',
                  right: '29px !important',
                  left: 'auto !important',
                  boxShadow: '0px 2px 6px #00000033',
                },
              }}
            >
              <Box
                sx={{
                  padding: '20px 0',
                  background: (theme) => theme.palette.white.dark,
                  boxShadow: '0px 2px 6px #00000033',
                  borderRadius: 1,
                }}
              >
                {/* <FlexBox onClick={handleClose}>
                  <SettingIcon />
                  <Typography
                    variant='subtitle1'
                    sx={{ ml: '9px', color: (theme) => theme.palette.black.light }}
                  >
                    Account Settings
                  </Typography>
                </FlexBox> */}
                <FlexBox onClick={toggleConfirm}>
                  <LogoutIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
                  <Typography
                    variant='subtitle1'
                    sx={{ ml: '9px', color: (theme) => theme.palette.black.light }}
                  >
                    {handleTranslations(t, 'Sign Out')}
                  </Typography>
                </FlexBox>
              </Box>
            </Popover>
          </Grid>
        </Grid>
      </Toolbar>
      <AboutDialog isOpen={isOpenAbout} closeAboutHandler={closeAboutHandler} />
      <ConfirmLogout
        toggleDialog={toggleConfirm}
        openNow={confirmOpen}
        action={logoutUser}
        text='Do you want to logout?'
      />
    </AppBar>
  );
};

export default AppBarContent;
