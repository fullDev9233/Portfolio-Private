/* eslint-disable jsx-a11y/no-autofocus */
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

export default function AlertDialog({
  openNow,
  toggleDialog,
  action,
  text,
  id,
}: {
  openNow: boolean;
  toggleDialog: any;
  action: any;
  text: string;
  id?: string | number;
}) {
  const dispatch = useDispatch();
  const t = useSelector(selectTranslations);

  const handleConfirm = () => {
    dispatch(action(id));
    toggleDialog();
  };

  const handleToggle = () => {
    toggleDialog();
  };

  return (
    <Dialog
      open={openNow}
      onClose={handleToggle}
      aria-labelledby='logout-dialog-title'
      aria-describedby='logout-dialog-description'
      sx={{
        '& .MuiPaper-root.MuiDialog-paper': { width: '370px' },
      }}
    >
      <DialogTitle
        id='logout-dialog-title'
        variant='h4'
        sx={{ color: (theme) => theme.palette.primary.dark, padding: 2.5 }}
      >
        {handleTranslations(t, text)}
      </DialogTitle>
      <DialogContent sx={{ padding: '10px 20px 30px', flex: 'inherit' }}>
        <DialogContentText
          id='logout-dialog-description'
          variant='subtitle1'
          sx={{ color: (theme) => theme.palette.black.main }}
        >
          {handleTranslations(t, 'Once confirmed this can not be undone!!')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '20px' }}>
        <Button
          sx={{
            padding: '10px 35px',
            fontSize: (theme) => theme.typography.subtitle1.fontSize,
            textTransform: 'capitalize',
          }}
          onClick={handleToggle}
        >
          {handleTranslations(t, 'Cancel')}
        </Button>
        <Button
          onClick={handleConfirm}
          autoFocus
          sx={{
            padding: '10px 35px',
            background: (theme) => theme.palette.green.dark,
            color: (theme) => theme.palette.white.dark,
            fontSize: (theme) => theme.typography.subtitle1.fontSize,
            textTransform: 'capitalize',
            '&:hover': {
              background: (theme) => theme.palette.green.dark,
              opacity: 0.7,
            },
          }}
        >
          {handleTranslations(t, 'Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
