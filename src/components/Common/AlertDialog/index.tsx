import { Dialog, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPortfolio } from '../../../store/portfolio/actions';
import { AppDispatch } from '../../../store';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';
import { Badge, FlexBox, StartOverButton, ViewButton } from './styles';

export default function AlertDialog({
  openNow,
  toggleDialog,
  title,
  message,
  success,
  reset,
  portfolioId,
  serverMessage,
}: {
  openNow: boolean;
  success: boolean;
  toggleDialog: any;
  reset: any;
  title: string;
  message: string;
  portfolioId: string;
  serverMessage?: string;
}) {
  const navigate = useNavigate();
  const disaptch: AppDispatch = useDispatch();
  const t = useSelector(selectTranslations);

  const handleNavigateToPortfolio = () => {
    toggleDialog();
    disaptch(setSelectedPortfolio(portfolioId));
    navigate('/analysis', { replace: true });
  };

  const handleStartOver = () => {
    handleClose();
    reset();
  };

  const handleClose = () => {
    toggleDialog();
  };

  return (
    <Dialog
      open={openNow}
      onClose={success ? handleStartOver : handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <FlexBox sx={{ minWidth: 500, padding: 2.5 }}>
        <Badge success={`${success}`}>
          {success ? (
            <CheckIcon fontSize='large' sx={{ color: (theme) => theme.palette.green.dark }} />
          ) : (
            <CloseIcon fontSize='large' sx={{ color: (theme) => theme.palette.red.dark }} />
          )}
        </Badge>
        <div style={{ width: 'calc(100% - 60px)' }}>
          <Typography
            variant='h4'
            className='status-title'
            sx={{
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            {handleTranslations(t, title)}
          </Typography>
          <section className='dialog-body' style={{ margin: '30px 0' }}>
            <Typography
              variant='subtitle1'
              sx={{
                color: (theme) => theme.palette.black.main,
                whiteSpace: 'pre-wrap',
              }}
            >
              {handleTranslations(t, message)}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                color: (theme) => theme.palette.black.main,
              }}
            >
              {serverMessage}
            </Typography>
          </section>
          <section className='dialog-footer'>
            {success ? (
              <FlexBox style={{ justifyContent: 'space-between' }}>
                <StartOverButton success={`${success}`} onClick={handleStartOver}>
                  {handleTranslations(t, 'Start Over')}
                </StartOverButton>
                <ViewButton onClick={handleNavigateToPortfolio}>View Portfolio</ViewButton>
              </FlexBox>
            ) : (
              <StartOverButton success={`${success}`} onClick={handleClose}>
                {handleTranslations(t, 'Review Again')}
              </StartOverButton>
            )}
          </section>
        </div>
      </FlexBox>
    </Dialog>
  );
}
