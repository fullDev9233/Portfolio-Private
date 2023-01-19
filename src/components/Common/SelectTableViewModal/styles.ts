import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)<any>(({ theme }) => ({
  padding: '10px 35px',
  background: theme.palette.white.dark,
  color: theme.palette.primary.dark,
  textTransform: 'capitalize',
  fontSize: theme.typography.subtitle1.fontSize,
  borderRadius: '6px',
  '&:hover': {
    background: theme.palette.white.dark,
    opacity: 0.7,
  },
  '&:disabled': {
    color: theme.palette.white.dark,
    cursor: 'not-allowed',
    opacity: 0.7,
  },
}));

export const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 5px;
`;

export const FlexBox = styled('div')`
  display: flex;
  align-items: center;
`;
