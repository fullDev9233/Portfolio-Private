import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainBox = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  minHeight: '100vh',
  overflow: 'auto',
  padding: 33,
  paddingTop: 93,
}));
