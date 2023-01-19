import { Step, StepIconProps, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { StyledStepper, StyledStepLabel, StepIconRoot } from './styles';
import { RootState } from '../../../store';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

import CalendarIcon from '../../../assets/CalendarIcon';

const steps = ['Trading date', 'Value date', 'Booking date', ''];

interface InvestmentStepperProps {
  color?: string;
}

const InvestmentStepper = ({ color }: InvestmentStepperProps) => {
  const t = useSelector(selectTranslations);
  const theme = useTheme();
  const { selectedRow } = useSelector((state: RootState) => state.position);

  const dates = [selectedRow?.tradeDate, selectedRow?.valueDate, selectedRow?.entryDate];

  const StepIcon = (props: StepIconProps) => {
    const { active, completed, className, icon } = props;

    return (
      <StepIconRoot ownerState={{ completed, active }} className={className} color={color}>
        {icon !== 4 ? (
          <div className='step-icon' />
        ) : (
          <CalendarIcon color={color || theme.palette.other.dark} sx={{ ml: '13.5px' }} />
        )}
      </StepIconRoot>
    );
  };

  return (
    <StyledStepper activeStep={0} alternativeLabel color={color}>
      {steps.map((label, id) => (
        <Step key={label}>
          <StyledStepLabel
            color={color}
            StepIconComponent={StepIcon}
            sx={{
              fontSize: theme.typography.subtitle1.fontSize,
              textTransform: 'capitalize',
            }}
          >
            {handleTranslations(t, label)}
            {id !== 3 && (
              <Typography
                variant='h4'
                mt={1}
                fontWeight={700}
                sx={{ color: theme.palette.white.dark }}
              >
                {dates[id] ? format(new Date(dates[id]), 'dd.MM.yyyy') : ''}
              </Typography>
            )}
          </StyledStepLabel>
        </Step>
      ))}
    </StyledStepper>
  );
};

export default InvestmentStepper;
