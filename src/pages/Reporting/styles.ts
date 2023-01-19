import { styled } from '@mui/material/styles';
import { DataGridPremiumProps } from '@mui/x-data-grid-premium';
import { StyledDataDrid as DataGridPremium } from '../../components/Common/DataGrid/styles';

export const StyledSection = styled('section')<any>(({ theme }) => ({
  background: theme.palette.white.main,
  borderRadius: '8px',
  opacity: 1,
  minHeight: '100%',
}));

export const SectionBody = styled('div')`
  padding: 0;
  border-top: ${({ theme }) => `1px solid ${theme.palette.gray.light}`};
  background: ${({ theme }) => theme.palette.white.dark};
  border-radius: 0 0 8px 8px;
`;

export const StyledDataDrid = styled(DataGridPremium)<DataGridPremiumProps>(
  ({ checkboxSelection, theme }) => ({
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-row>.MuiDataGrid-cell:first-of-type':
      {
        paddingLeft: checkboxSelection ? 0 : theme.spacing(2.5),
      },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:last-of-type, .MuiDataGrid-row>.MuiDataGrid-cell:nth-last-of-type(2)':
      {
        paddingRight: theme.spacing(2.5),
      },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainerContent': {
      div: { margin: 0 },
    },
    '& .MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
      color: theme.palette.amber.light,
    },
    '& .MuiDataGrid-toolbarContainer': {
      margin: 0,
      '& .MuiButton-text': {
        color: checkboxSelection ? theme.palette.white.dark : theme.palette.primary.dark,
      },
    },
    height: 'calc(100vh - 207px)',
  }),
);

export const FlexBox = styled('div')`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: ${({ theme }) => theme.palette.black.light};
  margin-right: 10px;
`;
