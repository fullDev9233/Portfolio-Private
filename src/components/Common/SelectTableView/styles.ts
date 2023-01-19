import { Button, Popper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)`
  padding: 4px 5px 4px 9px;
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize}px;
  color: ${({ theme }) => theme.palette.primary.dark};
  text-transform: capitalize;
  border: none;
  :hover {
    border: none;
  }
`;

export const StyledPopper = styled(Popper)`
  background: ${({ theme }) => theme.palette.white.dark};
  box-shadow: 0px 2px 6px #00000033;
  border-radius: 8px;
  .MuiBox-root {
    border-radius: 8px;
  }
`;

export const FlexBox = styled('div')`
  display: flex;
  align-items: center;
`;

export const TypographyTitle = styled(Typography)`
  margin-left: 10px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.palette.primary.dark};
  text-transform: capitalize;
`;
