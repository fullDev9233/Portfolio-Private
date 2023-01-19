import { useTheme } from '@mui/material/styles';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useSelector } from 'react-redux';
import Container from './styles';
import { RootState } from '../../../store';
import { formatNumbers } from '../../../utils/formatNumbers';

interface ThresholdValidatorProps {
  value?: number;
  threshold?: number;
  isChart?: boolean;
  isTooltip?: boolean;
}

const ThresholdValidator = ({
  value,
  threshold = 0,
  isChart,
  isTooltip,
}: ThresholdValidatorProps) => {
  const theme = useTheme();
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];
  const widthAndHeight = isChart ? (isTooltip ? 16 : 32) : 18;
  const marginleft = isChart ? 0 : '5px';

  return (
    <Container
      value={value}
      threshold={threshold}
      ischart={`${isChart}`}
      istooltip={`${isTooltip}`}
    >
      {value !== undefined ? (
        <>
          {formatNumbers(value, currentLocale)}
          {isChart && value !== 0 && ' %'}
          {value === 0 ? (
            <HorizontalRuleIcon
              sx={{
                width: widthAndHeight,
                height: widthAndHeight,
                marginLeft: marginleft,
                color: theme.palette.gray.main,
              }}
            />
          ) : value > threshold ? (
            <NorthEastIcon
              sx={{
                width: widthAndHeight,
                height: widthAndHeight,
                marginLeft: marginleft,
                color: theme.palette.green.dark,
              }}
            />
          ) : (
            <SouthEastIcon
              sx={{
                width: widthAndHeight,
                height: widthAndHeight,
                marginLeft: marginleft,
                color: theme.palette.red.dark,
              }}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default ThresholdValidator;
