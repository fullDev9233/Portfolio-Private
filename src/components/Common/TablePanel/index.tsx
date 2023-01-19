import {
  GridPanel,
  useGridApiContext,
  useGridSelector,
  gridPreferencePanelStateSelector,
} from '@mui/x-data-grid-premium';

const TableCustomPanel = (props: any) => {
  const apiRef = useGridApiContext();
  const preferencePanelState = useGridSelector(apiRef, gridPreferencePanelStateSelector);

  const anchorEl =
    preferencePanelState.openedPanelValue === 'filters'
      ? document.getElementById('filter-anchor')
      : document.getElementById('column-anchor');

  return <GridPanel {...props} anchorEl={anchorEl} />;
};

export default TableCustomPanel;
