import { useQuery } from '@apollo/client';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  useGridApiRef,
  GridColumns,
  useKeepGroupedColumnsHidden,
  GridRowParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid-premium';
import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GroupColumn from '../Common/GroupColumn';
import ThresholdValidator from '../Common/ThresholdValidator';
import {
  StyledDataDrid,
  FilterPanelProps,
  ColumnsPanelProps,
  MenuPanelProps,
} from '../Common/DataGrid/styles';
import NonBankableAssetToolBar from '../NonBankableAssetToolBar';
import CustomPanel from '../Common/TablePanel';
import RowContextMenu from '../Common/ContextMenu';
import FlexBox from '../Common/FlexBox';
import DataGridCustomRow from '../Common/DataGridCustomRow';
import AssetDetailDrawer from '../AssetDetailDrawer';
import AddValuationDrawer from '../AddValuationDrawer';

import { AppDispatch, RootState } from '../../store';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { toggleAssetDetailDrawer, toggleAddValuationDrawer } from '../../store/drawer/actions';
import { setIlliquidAsset } from '../../store/nonBankableAssets/actions';
import { NON_BANKABLE_ASSETS_QUERY } from '../../services/GraphQL/nonBankableAssets';
import { NonBankableAssetsQuery, NonBankableAssetsQueryVariables } from '../../gql/graphql';
import { selectCorrectDataGridLocale, formatNumbers } from '../../utils';

import FilterIcon from '../../assets/FilterIcon';
import VisibleColumnsIcon from '../../assets/VisibleColumnsIcon';
import ExportIcon from '../../assets/ExportIcon';
import ArrowRightIcon from '../../assets/ArrowRight';
import ArrowDownIcon from '../../assets/ArrowDown';

export default function Table() {
  const theme = useTheme();
  const apiRef = useGridApiRef();
  const dispatch: AppDispatch = useDispatch();

  const t = useSelector(selectTranslations);
  const { isLoading, selectedPortfolio } = useSelector((state: RootState) => state.portfolio);
  const { illiquidAsset } = useSelector((state: RootState) => state.nonBankableAssets);
  const { isOpenAssetDetail, isOpenAddValuation } = useSelector(
    (state: RootState) => state.drawer,
  );
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );

  const { loading, data: nonBankableAssets } = useQuery<
    NonBankableAssetsQuery,
    NonBankableAssetsQueryVariables
  >(NON_BANKABLE_ASSETS_QUERY, {
    variables: { portfolioId: selectedPortfolio },
  });

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const currentLocale = supportedLangs[selectedLanguage];
  const localeToUse = selectCorrectDataGridLocale(selectedLanguage);

  const columns: GridColDef[] = [
    {
      headerName: handleTranslations(t, 'ASSET TYPE'),
      field: 'instrumentTypeName',
      flex: 1,
      renderHeader: () => <GroupColumn name='ASSET TYPE' />,
    },
    {
      headerName: handleTranslations(t, 'ASSET NAME'),
      field: 'illiquidAsset',
      flex: 1,
      valueGetter: (params: any) => params.value?.name,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Typography
          sx={{
            fontSize: theme.typography.subtitle1.fontSize,
            color: theme.palette.primary.dark,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      headerName: handleTranslations(t, 'MARKET VALUE'),
      field: 'marketValue',
      flex: 1,
      type: 'number',
      renderHeader: () => (
        <FlexBox>
          <Typography
            sx={{
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.black.light,
              textTransform: 'uppercase',
            }}
            ml='5px'
          >
            {handleTranslations(t, 'MARKET VALUE')}
          </Typography>
        </FlexBox>
      ),
      renderCell: (params: GridRenderCellParams<number>) => (
        <Typography
          sx={{
            fontSize: theme.typography.subtitle1.fontSize,
            color: theme.palette.black.main,
            fontWeight: 500,
          }}
        >
          {params.value ? formatNumbers(params.value, currentLocale) : null}
        </Typography>
      ),
    },
    {
      headerName: handleTranslations(t, 'CURRENCY'),
      field: 'currency',
      flex: 1,
      renderHeader: () => <GroupColumn name='CURRENCY' />,
    },
    {
      headerName: handleTranslations(t, 'YIELD YTD'),
      field: 'timeWeightedReturn',
      flex: 1,
      type: 'number',
      renderCell: (params: GridRenderCellParams<number>) => (
        <ThresholdValidator value={params.value} />
      ),
    },
  ];

  const columnsMemoized = useMemo<GridColumns>(
    () =>
      columns.map((colDef) =>
        colDef.field === 'instrumentTypeName' || colDef.field === 'currency'
          ? colDef
          : { ...colDef, groupable: false },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLanguage],
  );

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ['instrumentTypeName'],
      },
    },
  });

  const handleRowClick = useCallback(
    (_rowId: string) => {
      const selected =
        nonBankableAssets &&
        nonBankableAssets?.illiquidAssetPortfolioPositions &&
        nonBankableAssets?.illiquidAssetPortfolioPositions.filter(
          (nonBankableAsset) => nonBankableAsset?.id === _rowId,
        );
      if (selected && selected.length > 0 && selected[0])
        dispatch(setIlliquidAsset(selected[0]));
    },
    [dispatch, nonBankableAssets],
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    const rowId = event.currentTarget.getAttribute('data-id');
    if (rowId && !rowId.startsWith('auto')) {
      handleRowClick(rowId);
      setContextMenu(
        contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null,
      );
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenuClick = (id: number) => {
    if (id === 0) {
      dispatch(toggleAssetDetailDrawer(true));
      dispatch(toggleAddValuationDrawer(false));
    } else {
      dispatch(toggleAssetDetailDrawer(false));
      dispatch(toggleAddValuationDrawer(true));
    }
    handleClose();
  };

  const rowClickHandler = (params: any) => {
    if (illiquidAsset?.id !== params.id) {
      handleRowClick(params.id);
    }
  };

  return (
    <>
      <StyledDataDrid
        apiRef={apiRef}
        loading={isLoading || loading}
        columns={columnsMemoized}
        rows={(nonBankableAssets?.illiquidAssetPortfolioPositions as any) || []}
        localeText={localeToUse.components.MuiDataGrid.defaultProps.localeText}
        defaultGroupingExpansionDepth={-1}
        groupingColDef={{ hideDescendantCount: true }}
        initialState={initialState}
        className='illiquid-asset-table'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        getRowClassName={(params) => (params.id.startsWith('auto') ? 'group' : '')}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        isRowSelectable={(params: GridRowParams) => !params.id.startsWith('auto')}
        density='compact'
        onRowClick={rowClickHandler}
        selectionModel={illiquidAsset?.id}
        components={{
          Toolbar: NonBankableAssetToolBar,
          Panel: CustomPanel,
          Row: DataGridCustomRow,
          OpenFilterButtonIcon: FilterIcon,
          ColumnSelectorIcon: VisibleColumnsIcon,
          ExportIcon: ExportIcon,
          GroupingCriteriaCollapseIcon: ArrowDownIcon,
          GroupingCriteriaExpandIcon: ArrowRightIcon,
          NoRowsOverlay: () => (
            <Stack height='100%' alignItems='center' justifyContent='center'>
              {handleTranslations(t, 'Select A Portfolio')}
            </Stack>
          ),
        }}
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: 'context-menu' },
          },
          basePopper: {
            sx: {
              zIndex: 12005,
              '&.MuiDataGrid-menu': {
                top: '16px !important',
                '& .MuiPaper-root': MenuPanelProps(theme),
              },
            },
          },
          filterPanel: FilterPanelProps(theme),
          columnsPanel: {
            sx: ColumnsPanelProps(theme),
          },
        }}
        sx={{ '& .MuiDataGrid-rowCount': { display: 'none' } }}
      />
      <RowContextMenu
        handleClose={handleClose}
        contextMenu={contextMenu}
        options={['Asset Detail', 'Add Valuation']}
        handleMenuClick={handleContextMenuClick}
      />
      {isOpenAssetDetail && <AssetDetailDrawer />}
      {isOpenAddValuation && <AddValuationDrawer />}
    </>
  );
}
