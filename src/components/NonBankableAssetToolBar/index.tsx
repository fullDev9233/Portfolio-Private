import {
  useGridApiContext,
  GridToolbarExport,
  gridFilteredSortedRowIdsSelector,
} from '@mui/x-data-grid-premium';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableStylePppper from '../Common/TableStylePopper';
import { StyledButton } from '../ReportForm/styles';
import { FlexBox, StyledDataGridToolBar } from '../TableToolBar/styles';
import { ToolbarFilterButton } from '../ToolbarFilterButton';
import { ToolbarColumnsButton } from '../Common/ToolbarColumnsButton';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { AppDispatch } from '../../store';
import { toggleNonBankableAssetTab } from '../../store/nonBankableAssets/actions';
import BookAssetIcon from '../../assets/BookAssetIcon';

const NonBankableAssetToolBar = () => {
  const apiRef = useGridApiContext();
  const t = useSelector(selectTranslations);
  const dispatch: AppDispatch = useDispatch();

  const changeHandler = useCallback(() => {
    dispatch(toggleNonBankableAssetTab(1));
  }, [dispatch]);

  return (
    <StyledDataGridToolBar>
      <FlexBox>
        <ToolbarFilterButton />
        <ToolbarColumnsButton />
        <TableStylePppper />
      </FlexBox>
      <FlexBox>
        <GridToolbarExport
          excelOptions={{ getRowsToExport: () => gridFilteredSortedRowIdsSelector(apiRef) }}
          csvOptions={{ getRowsToExport: () => gridFilteredSortedRowIdsSelector(apiRef) }}
          printOptions={{ disableToolbarButton: true }}
          sx={{ padding: '4px 3px' }}
        />
        <StyledButton
          startIcon={<BookAssetIcon />}
          onClick={changeHandler}
          className='non-bankable-asset-btn'
          sx={{
            color: (theme) => `${theme.palette.white.dark} !important`,
            margin: '0 0 0 30px',
          }}
        >
          {handleTranslations(t, 'Book Non-Bankable Asset')}
        </StyledButton>
      </FlexBox>
    </StyledDataGridToolBar>
  );
};

export default NonBankableAssetToolBar;
