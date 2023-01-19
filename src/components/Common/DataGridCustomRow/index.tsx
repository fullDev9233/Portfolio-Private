import { useTheme } from '@mui/material';
import { useGridApiContext, GridRow } from '@mui/x-data-grid-premium';
import type { ComponentProps } from 'react';

const DataGridCustomRow = (props: ComponentProps<typeof GridRow>) => {
  const theme = useTheme();
  const apiRef = useGridApiContext();
  const rowNode = apiRef.current.getRowNode(props.rowId);

  const stylesToMerge =
    (rowNode?.depth ?? 0) > 0 ? { backgroundColor: theme.palette.mixed.light } : {};

  return <GridRow {...props} style={{ cursor: 'context-menu', ...stylesToMerge }} />;
};

export default DataGridCustomRow;
