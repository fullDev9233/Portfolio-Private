import { useState, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../../store';
import { changeLanguage, updateUserPreferences } from '../../store/user/actions';
import { FlexBox, StyledButton } from './styles';
import FlagEn from '../../assets/FlagEn';
import FlagDe from '../../assets/FlagDe';
import FlagFr from '../../assets/FlagFr';

const flags: any = { EN: FlagEn, DE: FlagDe, FR: FlagFr };

export default function Locales() {
  const selectedLanguage = useSelector((state: RootState) => state.user.selectedLanguage);
  const supportedLanguages = useSelector((state: RootState) => state.i18n.supportedLangs);
  const [locale, setLocale] = useState<string>(selectedLanguage);
  const dispatch: AppDispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const SelectedFlag = flags[locale];

  useEffect(() => {
    setLocale(selectedLanguage);
  }, [selectedLanguage]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'lang-popover' : undefined;

  const handleLanguageChange = (value: string) => {
    setLocale(value);
    dispatch(changeLanguage(value));
    dispatch(updateUserPreferences({ language: value }));
    handleClose();
  };

  return (
    <div>
      <StyledButton
        aria-describedby={id}
        variant='contained'
        startIcon={<SelectedFlag sx={{ width: 16, height: 16 }} />}
        onClick={handleClick}
      >
        {locale}
      </StyledButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 20000,
          '& .MuiPaper-root.MuiPopover-paper': {
            left: 'auto !important',
            right: '118px',
            padding: '20px 0',
            boxShadow: '0px 2px 6px #00000033',
          },
        }}
      >
        {Object.keys(supportedLanguages).map((_locale: string) => {
          const Flag = flags[_locale];
          return (
            <FlexBox key={_locale} onClick={() => handleLanguageChange(_locale)}>
              <Flag sx={{ width: 16, height: 16 }} />
              <Typography
                variant='subtitle1'
                sx={{ ml: '9px', color: (theme) => theme.palette.black.light }}
              >
                {_locale}
              </Typography>
            </FlexBox>
          );
        })}
      </Popover>
    </div>
  );
}
