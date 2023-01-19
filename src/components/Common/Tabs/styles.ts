import { Tabs as StyledTabs, Tab as StyledTab } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Tabs = styled(StyledTabs)`
  min-height: 23px;
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.amber.main};
  }
`;

export const Tab = styled(StyledTab)<any>(({ theme }) => ({
  minWidth: 'fit-content',
  maxWidth: 'fit-content',
  minHeight: 'fit-content',
  padding: 0,
  textTransform: 'capitalize',
  fontSize: theme.typography.subtitle1.fontSize,
  '&:not(:last-child)': {
    marginRight: '35px',
  },
  '&.Mui-selected': {
    color: theme.palette.black.main,
    fontWeight: 500,
  },
}));
