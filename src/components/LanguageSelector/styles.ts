import { Button, styled } from '@mui/material';

export const FlexBox = styled('div')`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.palette.other.main};
  }
`;

export const StyledButton = styled(Button)`
  padding: 0;
  min-width: auto;
  background: transparent;
  border: none;
  box-shadow: none;
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize}px;
  color: ${({ theme }) => theme.palette.black.light};
  :hover {
    background: transparent;
    box-shadow: none;
  }
  & .MuiButton-startIcon {
    margin-right: 5px;
  }
`;
