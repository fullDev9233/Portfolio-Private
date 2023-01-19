import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 6,
  opacity: 1,
  background: `${theme.palette.white.light} 0% 0% no-repeat padding-box`,
  color: theme.palette.green.dark,
  '&:hover': {
    backgroundColor: theme.palette.green.light,
  },
}));
