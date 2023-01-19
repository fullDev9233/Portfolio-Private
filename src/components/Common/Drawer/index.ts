import MuiDrawer from '@mui/material/Drawer';
import styled from '@mui/material/styles/styled';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      // width: 300,
      zIndex: 1200,
      maxWidth: 1820,
      backgroundColor: 'white',
      marginTop: 70,
      //   paddingBottom: 80,
      height: 'calc(100% - 80px)',
      boxShadow: '0px 2px 6px #00000033',
      borderRadius: 5, //'5px 0 5px 0',
      //   position: 'relative',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      borderLeft: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: '0px !important',
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default Drawer;
