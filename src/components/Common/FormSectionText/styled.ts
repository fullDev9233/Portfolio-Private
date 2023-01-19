import { Typography, styled } from '@mui/material';

export const StyledText = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  font: theme.typography.responsiveH5.font,
  letterSpacing: '0.22px',
  color: theme.palette.black.light,
  textTransform: 'uppercase',
  opacity: 1,
  paddingBottom: 17,
  paddingTop: 5,
}));
