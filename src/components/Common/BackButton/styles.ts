import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 6,
  opacity: 1,
  background: `${theme.palette.white.dark} 0% 0% no-repeat padding-box`,
  color: theme.palette.green.dark,
  marginLeft: '0px !important',
  paddingLeft: 0,
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: 500,
  padding: '10px 10px 10px 0',
  '&:hover': {
    backgroundColor: theme.palette.green.light,
  },
}));
