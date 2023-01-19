import { Typography, TypographyProps } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 12001,
  paddingRight: 33,
  paddingLeft: 22,
  marginLeft: drawerWidth,
  backgroundColor: 'white',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    paddingLeft: 33,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'left',
  font: 'normal normal 900 14px/19px Roboto;',
  letterSpacing: '-0.14px',
  color: theme.palette.blueGrey.dark,
  opacity: 1,
}));

export const FlexBox = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.other.main};
    .MuiTypography-root {
      color: ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;
