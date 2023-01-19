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
  z-index: 1;
  box-shadow: 0px 2px 6px #00000033;
  border-radius: 8px;
  .MuiBox-root {
    padding: 20px;
    border-radius: 8px;
  }
`;

export const FlexBox = styled('div')`
  display: flex;
  align-items: center;
`;

export const TypographyTitle = styled(Typography)`
  margin-left: 10px;
  font: ${({ theme }) => theme.typography.responsiveH3.font};
  letter-spacing: 0px;
  color: ${({ theme }) => theme.palette.primary.dark};
  text-transform: capitalize;
`;

export const DensityElement = styled('div')<{ active: string }>`
  width: 150px;
  padding: 16px 10px;
  background: ${({ theme }) => theme.palette.white.dark};
  border: ${({ active, theme }) =>
    active === 'true'
      ? `2px solid ${theme.palette.amber.light}`
      : `2px solid ${theme.palette.gray.contrastText}`};
  border-radius: 8px;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
`;

export const SwitchGroup = styled('div')`
  position: relative;
  height: 15px;
  width: 31px;
  cursor: pointer;
`;

export const SwitchBar = styled('div')`
  position: absolute;
  top: 6px;
  width: 31px;
  height: 2px;
  background: ${({ theme }) => theme.palette.gray.contrastText};
`;

export const Switch = styled('div')<{ active: string }>`
  position: absolute;
  left: ${({ active }) => (active === 'true' ? '16px' : 0)};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active === 'true' ? theme.palette.green.dark : theme.palette.white.dark};
  box-shadow: ${({ active }) =>
    active !== 'true'
      ? '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),  0px 1px 3px 0px rgb(0 0 0 / 12%)'
      : 'none'};
  :hover {
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.12),
      0px 1px 8px rgba(0, 0, 0, 0.2);
  }
`;
