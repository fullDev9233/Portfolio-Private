import { Button, ButtonProps, styled } from '@mui/material';

const GreenBgButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.green.dark,
  color: theme.palette.white.dark,
  borderRadius: '6px',
  padding: '10px',
  '&:hover': {
    backgroundColor: theme.palette.green.dark,
    opacity: 0.7,
  },
}));

export default GreenBgButton;
