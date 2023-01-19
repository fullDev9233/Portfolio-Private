import { Stepper, StepLabel, styled } from '@mui/material';

import FlexBox from '../FlexBox';

export const SelectedTransaction = styled('div')<any>(({ bg, theme }) => ({
  width: 'calc(100% - 500px)',
  margin: '25px 0 4px 0',
  border: `1px solid ${theme.palette.gray.light}`,
  borderLeft: 'none',
  zIndex: 100,
  background: theme.palette.white.dark,
  borderRadius: '0 8px 8px 0',
  overflow: 'auto',

  '.investment-section': {
    display: 'flex',
    minWidth: '780px',
    padding: '20px 20px 14px',
    background: bg,
  },
}));

export const StyledStepper = styled(Stepper)<any>(({ color, theme }) => ({
  '.MuiStep-root': {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
    '.MuiStepConnector-root': {
      left: 'calc(-100% + 9px)',
      right: 'calc(100% + 2px)',
      top: '8px',
      '.MuiStepConnector-line': {
        borderColor: color || theme.palette.other.dark,
        borderTopStyle: 'dotted',
        borderTopWidth: '3px',
      },
    },
    '.MuiStepLabel-root': {
      alignItems: 'flex-start',
    },
  },
}));

export const StyledStepLabel = styled(StepLabel)<any>(({ color, theme }) => ({
  '& .MuiStepLabel-label': {
    margin: '7px 0 0 !important',
    font: theme.typography.responsiveH4.font,
    color: color || theme.palette.other.dark,
    textAlign: 'left !important',
    '&.Mui-active': {
      color: `${color || theme.palette.other.dark} !important`,
    },
  },
}));

export const StepIconRoot = styled(FlexBox)<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ color, theme }) => ({
  justifyContent: 'center',
  '& .step-icon': {
    width: 7,
    height: 7,
    marginTop: '6px',
    borderRadius: '50%',
    border: `2px solid ${color || theme.palette.other.dark}`,
  },
}));

export const DetailCard = styled('div')<any>(({ isborder = 'true', width, theme }) => ({
  width: width,
  margin: '20px 0',
  padding: '0 20px',
  borderRight: isborder === 'true' ? `1px solid ${theme.palette.gray.light}` : 'none',
}));
