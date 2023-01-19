import { CircularProgress, Dialog, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexBox, StyledButton, StyledTextField } from './styles';
import { ModalParamsProps } from '../../../types/selectTableView';
import { AppDispatch } from '../../../store';
import { toggleSelectTableView } from '../../../store/modal/actions';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

interface SelectTableViewModalProps {
  isOpenModal: boolean;
  newLabel?: string;
  setNewLabel?: Dispatch<SetStateAction<string>>;
  modalParams: ModalParamsProps;
  error: string;
  isLoading: boolean;
  handleModalChange: () => void;
}

const SelectTableViewModal = ({
  isOpenModal,
  newLabel,
  setNewLabel,
  modalParams,
  error,
  isLoading,
  handleModalChange,
}: SelectTableViewModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const t = useSelector(selectTranslations);

  const handleClose = () => {
    dispatch(toggleSelectTableView(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (setNewLabel) {
      if (e.target.value.length > 25) return;
      setNewLabel(e.target.value);
      dispatch(toggleSelectTableView(true));
    }
  };

  return (
    <Dialog
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby='crud-dialog-title'
      aria-describedby='crud-dialog-description'
    >
      <div style={{ padding: 20, minWidth: 360 }}>
        <Typography
          variant='h4'
          sx={{ color: (theme) => theme.palette.primary.dark, mb: 3.75 }}
        >
          {handleTranslations(t, modalParams.title)}
        </Typography>
        {setNewLabel && (
          <>
            <StyledTextField
              id='view-name'
              label='Table View Name'
              variant='outlined'
              value={newLabel}
              sx={{
                '& .MuiFormLabel-root.MuiInputLabel-root': {
                  color: (theme) =>
                    error ? theme.palette.red.dark : theme.palette.black.light,
                },
                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: (theme) =>
                      `1px solid ${
                        error ? theme.palette.red.dark : theme.palette.gray.contrastText
                      }`,
                  },
                },
              }}
              onChange={handleChange}
            />
            {!error && (
              <div style={{ margin: '5px 0 30px 14px' }}>
                <Typography
                  variant='caption'
                  sx={{ color: (theme) => theme.palette.black.light }}
                >
                  {handleTranslations(t, 'Maximum 25 characters')}
                </Typography>
              </div>
            )}
          </>
        )}
        {(modalParams.content || error) && (
          <div style={{ margin: error ? '20px 0 30px' : '30px 0 50px' }}>
            <Typography
              variant='subtitle1'
              sx={{
                color: (theme) => theme.palette.black.main,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.4,
              }}
            >
              {modalParams.content || error}
            </Typography>
          </div>
        )}
        <FlexBox style={{ justifyContent: 'flex-end' }}>
          {(modalParams.cancelName || error) && (
            <StyledButton onClick={handleClose}>
              {handleTranslations(t, modalParams.cancelName || 'Cancel')}
            </StyledButton>
          )}
          <StyledButton
            sx={{
              background: (theme: Theme) => theme.palette.green.dark,
              color: (theme: Theme) => theme.palette.white.dark,
              '&:hover': {
                background: (theme: Theme) => theme.palette.green.dark,
              },
            }}
            endIcon={
              isLoading ? (
                <CircularProgress
                  size={16}
                  sx={{ color: (theme) => theme.palette.white.dark }}
                />
              ) : (
                <></>
              )
            }
            disabled={error ? true : false}
            onClick={handleModalChange}
          >
            {handleTranslations(t, modalParams.okName)}
          </StyledButton>
        </FlexBox>
      </div>
    </Dialog>
  );
};

export default SelectTableViewModal;
