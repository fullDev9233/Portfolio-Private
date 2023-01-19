import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FlexBox = styled('div')`
  display: flex;
`;

export const Badge = styled(FlexBox)<{ success: string }>`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  background: ${({ success, theme }) =>
    success === 'true' ? theme.palette.mixed.main : theme.palette.red.main};
`;

export const StartOverButton = styled(Button)<{ success?: string }>`
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize}px;
  font-weight: 500;
  color: ${({ success, theme }) =>
    success === 'true' ? theme.palette.green.dark : theme.palette.red.dark};
  background: ${({ theme }) => theme.palette.mixed.dark};
  text-transform: capitalize;
  border-radius: 6px;
  :hover {
    opacity: 0.8;
  }
`;

export const ViewButton = styled(StartOverButton)`
  color: ${({ theme }) => theme.palette.white.dark};
  background: ${({ theme }) => theme.palette.green.dark};
  :hover {
    background: ${({ theme }) => theme.palette.green.dark};
  }
`;
