import { Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import Stepper from './Stepper';
import TransactionTable from './TransactionTable';
import { SelectedTransaction } from './styles';
import { RootState } from '../../../store';
import { formatColor } from '../../../utils/formatColor';
import ArrowRightCircleIcon from '../../../assets/ArrowRightCircleIcon';
import TransactionIcon from '../../../assets/TransactionIcon';
import CashIcon from '../../../assets/CashIcon';

interface TransactionDetailTableProps {
  sx?: any;
}

const TransactionDetailTable = ({ sx }: TransactionDetailTableProps) => {
  const theme = useTheme();
  const { selectedRow } = useSelector((state: RootState) => state.position);

  const amount = selectedRow?.numbersTrdCcy;
  const formatColors = formatColor(theme, amount);
  const Icon =
    formatColors.color === 'red'
      ? CashIcon
      : formatColors.color === 'amber'
      ? TransactionIcon
      : ArrowRightCircleIcon;

  return (
    <SelectedTransaction bg={formatColors.bgColor} sx={sx}>
      <section className='investment-section'>
        <Icon sx={{ width: 32, height: 32 }} />
        <div style={{ width: 'calc(100% - 42px)', marginLeft: '10px' }}>
          <Typography
            variant='h4'
            sx={{ margin: '5px 0 12px', fontWeight: 700, color: theme.palette.white.dark }}
          >
            {selectedRow?.transTypeName}
          </Typography>
          <Typography
            variant='h4'
            mb={2.5}
            sx={{ fontWeight: 500, color: theme.palette.white.dark }}
          >
            {`${selectedRow?.security} ${selectedRow?.secShortcode}`}
          </Typography>
          <Stepper color={formatColors.txtColor} />
        </div>
      </section>
      <TransactionTable />
    </SelectedTransaction>
  );
};

export default TransactionDetailTable;
