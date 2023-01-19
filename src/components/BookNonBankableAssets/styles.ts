import {
  Typography,
  TypographyProps,
  Paper,
  PaperProps,
  StepLabel,
  StepLabelProps,
  Box,
  BoxProps,
  DividerProps,
  Divider,
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

export const StyledStepLabel = styled(StepLabel)<StepLabelProps>(({ theme }) => ({
  '& .MuiStepLabel-label': {
    font: theme.typography.responsiveH3.font,
    letterSpacing: 0,
    color: theme.palette.gray.main,
    textTransform: 'capitalize',
    opacity: 1,
    margin: '5px 0 0 !important',
    '& .Mui-completed': {
      color: theme.palette.gray.main,
    },
    '& .Mui-active': {
      fontWeight: 'bold',
      color: theme.palette.black.main,
    },
    '& .Mui-disabled': {
      background: theme.palette.white.dark,
    },
  },
}));

export const EtopsConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.gray.contrastText,
      borderTopWidth: 1,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.gray.contrastText,
      borderTopWidth: 1,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.gray.contrastText,
    borderTopWidth: 1,
    borderRadius: 1,
  },
}));

export const EtopsStepIconRoot = styled('div')<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  display: 'flex',
  width: 20,
  height: 20,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  ...(ownerState.active
    ? {
        color: theme.palette.amber.main,
        border: `2px solid ${theme.palette.amber.light}`,
      }
    : ownerState.completed
    ? {
        color: theme.palette.white.dark,
      }
    : {
        color: theme.palette.white.dark,
        border: `2px solid ${theme.palette.gray.main}`,
      }),
  '& .EtopsStepIcon-completedIcon': {
    color: theme.palette.purple.main,
    zIndex: 1,
    fontSize: theme.typography.h4.fontSize,
  },
  '& .EtopsStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

export const StyledText = styled(Typography)<TypographyProps>(({ theme }) => ({
  font: theme.typography.responsiveH2.font,
  letterSpacing: 0,
  color: `${theme.palette.primary.dark} !important`,
  textTransform: 'inherit',
  opacity: 1,
}));

export const StepperContainer = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: 0,
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.mixed.light,
}));

export const StyledPaper = styled(Paper)<PaperProps>(() => ({
  marginTop: 0,
  padding: 0,
  borderRadius: 0,
  boxShadow: 'none',
}));

export const StyledDivider = styled(Divider)<DividerProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.gray.light}`,
  marginLeft: -24,
  marginRight: -24,
  marginBottom: -24,
  opacity: 1,
}));

export const ButtonWrapper = styled('div')<any>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '25%',
  [theme.breakpoints.down(1320)]: {
    margin: '0 120px',
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 60px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 40px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down(500)]: {
    margin: '0 20px',
  },
}));
