import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')<{ isopen: string }>`
  position: ${({ isopen }) => (isopen === 'true' ? 'inherit' : 'absolute')};
  top: ${({ isopen }) => (isopen === 'true' ? 'inherit' : '68px')};
  right: 5px;
  width: 300px;
  height: ${({ isopen }) => (isopen === 'true' ? 'auto' : '46px')};
  background: ${({ theme }) => theme.palette.white.dark};
  box-shadow: 0px 2px 6px #00000033;
  border-radius: 8px 0px 0px 8px;
`;

export const AllocationsHeader = styled(Box)`
  padding: 20px 17px 0;
  background: ${({ theme }) => theme.palette.mixed.light};
  border-radius: 8px 8px 0px 0px;
  opacity: 1;
`;

export const StyledButton = styled(Button)<any>(({ isopen, theme }) => ({
  minHeight: '24px',
  width: isopen === 'true' ? '24px' : 'auto',
  borderRadius: isopen === 'true' ? '50%' : 'none',
  minWidth: 'auto',
  margin: '8px 10px',
  padding: '0 6px',
  fontSize: `${theme.typography.h5.fontSize}px`,
  textTransform: 'capitalize',
  '& .MuiButton-startIcon': {
    margin: isopen !== 'true' ? '0 8px 0 -4px' : 0,
  },
}));
