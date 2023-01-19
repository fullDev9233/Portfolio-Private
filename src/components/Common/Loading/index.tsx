import { Modal, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, style } from '../../ReportForm/styles';

export default function SimpleBackdrop({ open }: { open: boolean }) {
  return (
    <Modal BackdropComponent={Backdrop} open={open}>
      <Box mt={2} justifyContent='center' sx={{ ...style, display: 'flex' }}>
        <CircularProgress size={120} sx={{ color: (theme) => theme.palette.primary.dark }} />
      </Box>
    </Modal>
  );
}
