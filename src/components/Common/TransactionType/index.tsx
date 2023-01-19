import { Box, Typography } from '@mui/material';

export const getColor = (amount?: number) => {
  if (amount && amount > 0) return 'green';
  if (amount === 0) return 'amber';
  return 'red';
};

const TransactionType = (type?: string, amount?: string) => {
  const numberAmount: number = (
    Number.isInteger(amount) ? amount : parseFloat(amount || '0')
  ) as number;
  const color = getColor(numberAmount);
  const palette = color === 'amber' ? 'light' : 'dark';
  const bgPalette = color === 'amber' ? 'contrastText' : 'main';

  return (
    <Box
      sx={{
        width: 'fit-content',
        padding: '2px 10px',
        background: (theme) => theme.palette[color][bgPalette],
        borderRadius: '8px',
      }}
    >
      <Typography
        variant='body1'
        sx={{ fontWeight: 700, color: (theme) => theme.palette[color][palette] }}
      >
        {type || amount}
      </Typography>
    </Box>
  );
};

export default TransactionType;
