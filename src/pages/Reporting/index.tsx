import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';

import GenerateReport from '../../components/GenerateReports';
import ThresholdValidator from '../../components/Common/ThresholdValidator';
import RowContextMenu from '../../components/Common/ContextMenu';

import { Tabs } from '../../components/Common/Tabs';
import { SectionHeader } from '../DashBoard';
import { FlexBox, SectionBody, StyledSection, StyledDataDrid } from './styles';

import { AppDispatch, RootState } from '../../store';
import { formatNumbers } from '../../utils/formatNumbers';
import {
  setPAComponentMount,
  setPATransactionMount,
  setSelectedPortfolio,
} from '../../store/portfolio/actions';
import { setTabId } from '../../store/transaction/actions';
import FilterIcon from '../../assets/FilterIcon';
import VisibleColumnsIcon from '../../assets/VisibleColumnsIcon';
import {
  ColumnsPanelProps,
  FilterPanelProps,
  MenuPanelProps,
} from '../../components/Common/DataGrid/styles';
import CustomPanel from '../../components/Common/TablePanel';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';

const ReportingPage = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const portfolios = useSelector((state: RootState) => state.portfolio.portfolios);
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];
  const t = useSelector(selectTranslations);

  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(selectedTab);

  const [contextId, setContextId] = useState('');

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const columns = [
    {
      headerName: handleTranslations(t, 'Name'),
      field: 'portfolio_name',
      flex: 1,
    },
    {
      headerName: handleTranslations(t, 'Manager'),
      field: 'manager',
      flex: 1,
    },
    {
      headerName: handleTranslations(t, 'Strategy'),
      field: 'portfolio_target_type',
      flex: 1,
    },
    {
      headerName: handleTranslations(t, 'CCY'),
      field: 'ccy',
      flex: 1,
    },
    {
      headerName: handleTranslations(t, 'Custodian Bank'),
      field: 'bank',
      flex: 1,
    },
    {
      headerName: handleTranslations(t, 'Market Value'),
      field: 'current_value',
      type: 'number',
      flex: 1,
      valueFormatter: (params: any) =>
        params.value ? formatNumbers(params.value, currentLocale) : null,
    },
    {
      headerName: handleTranslations(t, 'Yield YTD'),
      field: 'ytd_performance',
      type: 'number',
      flex: 1,
      renderCell: (params: GridRenderCellParams<number>) => (
        <FlexBox sx={{ marginRight: 0 }}>
          <ThresholdValidator value={params.value} />
        </FlexBox>
      ),
      renderHeader: () => (
        <FlexBox sx={{ textTransform: 'uppercase' }}>
          {handleTranslations(t, 'Yield YTD')}
        </FlexBox>
      ),
    },
  ];

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    const rowId = event.currentTarget.getAttribute('data-id');
    if (rowId && !rowId.startsWith('auto')) {
      setContextId(rowId);
      setContextMenu(
        contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null,
      );
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenuClick = (id: number) => {
    dispatch(setSelectedPortfolio(contextId));
    dispatch(setPAComponentMount(false));
    dispatch(setPATransactionMount(false));
    dispatch(setTabId(id));
    navigate('/analysis');
  };

  const toggleCheckBoxes = () => {
    setShowCheckBoxes(!showCheckBoxes);
    setSelectedRows([]);
  };

  const onRowsSelectionHandler = (ids: string[]) => {
    setSelectedRows(ids);
  };

  const selectHandler = useCallback((selectKey: string, value: number) => {
    setSelectedTab(value);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedColumns = useMemo(() => columns, [selectedLanguage]);

  return (
    <StyledSection>
      <SectionHeader>
        <Typography variant='h4' sx={{ color: theme.palette.primary.dark }} mb={1.5}>
          {handleTranslations(t, 'Portfolios')}
        </Typography>
        <Tabs tabName='portfolio' labels={['Portfolios']} selectHandler={selectHandler} />
      </SectionHeader>
      <SectionBody style={{ width: '100%' }}>
        <StyledDataDrid
          checkboxSelection={showCheckBoxes}
          disableSelectionOnClick
          columns={memoizedColumns}
          rows={portfolios}
          onSelectionModelChange={(ids: any) => onRowsSelectionHandler(ids)}
          selectionModel={selectedRows}
          disableRowGrouping
          className='report-table'
          density='compact'
          components={{
            Toolbar: () => (
              <GenerateReport
                showCheckBoxes={showCheckBoxes}
                selectedRows={selectedRows}
                toggleCheckBoxes={toggleCheckBoxes}
              />
            ),
            OpenFilterButtonIcon: FilterIcon,
            ColumnSelectorIcon: VisibleColumnsIcon,
            Panel: CustomPanel,
          }}
          componentsProps={{
            basePopper: {
              sx: {
                '&.MuiDataGrid-menu': {
                  top: '16px !important',
                  '& .MuiPaper-root': MenuPanelProps(theme),
                },
              },
            },
            row: {
              onContextMenu: handleContextMenu,
              style: { cursor: !showCheckBoxes && 'context-menu' },
            },
            filterPanel: FilterPanelProps(theme),
            columnsPanel: {
              sx: ColumnsPanelProps(theme),
            },
          }}
        />
        {!showCheckBoxes && (
          <RowContextMenu
            handleClose={handleClose}
            contextMenu={contextMenu}
            options={['Position Table', 'Transaction Table']}
            handleMenuClick={handleContextMenuClick}
          />
        )}
      </SectionBody>
    </StyledSection>
  );
};

export default ReportingPage;
