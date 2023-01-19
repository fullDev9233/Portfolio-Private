import { Typography as BaseTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LabelsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 32px;
`;

export const Flex = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Dot = styled('div')<{ active: string; bg: string }>`
  width: 12px;
  height: 12px;
  margin-right: 16px;
  border: ${({ bg }) => `3px solid ${bg}`};
  border-radius: 50%;
  opacity: ${({ active }) => (active === 'true' ? 1 : 0.3)};
`;

export const Typography = styled(BaseTypography)<{ active: string }>`
  color: ${({ active, theme }) =>
    active === 'true' ? theme.palette.black.main : theme.palette.black.light};
  opacity: ${({ active }) => (active === 'true' ? 1 : 0.4)};
`;
