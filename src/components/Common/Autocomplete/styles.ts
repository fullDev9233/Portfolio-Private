import { Box, styled } from '@mui/material';

export const AutocompletePaperProps = () => {
  return {
    sx: {
      boxShadow: '0px 2px 6px #00000033',
    },
  };
};

export const StyledBox = styled(Box)<any>(({ theme }) => ({
  backgroundColor: theme.palette.white.dark,
  color: theme.palette.black.main,
  padding: '8px 20px',
  fontSize: theme.typography.subtitle1.fontSize,
  '&:hover': {
    backgroundColor: theme.palette.other.main,
    color: theme.palette.primary.dark,
  },
}));
