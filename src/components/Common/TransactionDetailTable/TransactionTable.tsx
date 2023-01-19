import { Divider, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import FlexBox from '../FlexBox';
import { DetailCard } from './styles';
import { RootState } from '../../../store';
import { selectTranslations } from '../../../store/i18n/reducer';
import { formatNumbers } from '../../../utils/formatNumbers';
import { formatColor } from '../../../utils/formatColor';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

interface DetailCardComponentProps {
  title: string;
  value: number;
  amount?: any;
  currency?: any;
}

const DetailCardComponent = ({ title, value, amount, currency }: DetailCardComponentProps) => {
  const theme = useTheme();
  const t = useSelector(selectTranslations);
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];
  const formatColors = formatColor(theme, amount);

  return (
    <>
      <Typography
        variant='subtitle2'
        sx={{ color: theme.palette.gray.main, textTransform: 'capitalize' }}
      >
        {handleTranslations(t, title)}
      </Typography>
      <FlexBox>
        {currency && value !== 0 && (
          <Typography
            mt={1}
            variant='responsiveH1'
            sx={{
              color: amount ? formatColors.bgColor : theme.palette.black.main,
            }}
          >
            {currency}&nbsp;
          </Typography>
        )}
        <Typography
          mt={1}
          variant='h3'
          sx={{
            color: amount ? formatColors.bgColor : theme.palette.black.main,
          }}
        >
          {formatNumbers(value, currentLocale)}
        </Typography>
      </FlexBox>
    </>
  );
};

interface DetailCardContentProps {
  title: string;
  value: number;
  currency?: string;
  digit?: number;
  mb?: string;
}

const DetailCardContent = ({
  title,
  value,
  currency,
  digit = 2,
  mb = '10px',
}: DetailCardContentProps) => {
  const t = useSelector(selectTranslations);
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];

  return (
    <FlexBox sx={{ justifyContent: 'space-between', mb }}>
      <Typography
        variant='subtitle2'
        sx={{
          width: '137px',
          color: (theme) => theme.palette.gray.main,
          textTransform: 'capitalize',
        }}
      >
        {handleTranslations(t, title)}
      </Typography>
      <FlexBox>
        {currency && value !== 0 && (
          <Typography
            variant='responsiveH3'
            sx={{ color: (theme) => theme.palette.black.main }}
          >
            {currency}
          </Typography>
        )}
        <Typography
          variant='subtitle1'
          fontWeight={500}
          sx={{
            width: '95px',
            color: (theme) => theme.palette.black.main,
            textAlign: 'right',
          }}
        >
          {formatNumbers(value, currentLocale, digit)}
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

const TransactionTable = () => {
  const { selectedRow } = useSelector((state: RootState) => state.position);
  const t = useSelector(selectTranslations);

  const amount = selectedRow?.numbersTrdCcy;

  return (
    <div style={{ minWidth: '780px' }}>
      <div style={{ display: 'flex' }}>
        <DetailCard width='42%'>
          <DetailCardComponent
            title='Total value in local CCY'
            value={selectedRow?.marketValTrdCcy}
            amount={amount}
            currency={selectedRow?.trdCcy}
          />
        </DetailCard>
        <DetailCard width='33%'>
          <DetailCardComponent
            title='units / nominal'
            value={selectedRow?.numbersTrdCcy || 0}
          />
        </DetailCard>
        <DetailCard isborder={'false'}>
          <DetailCardComponent
            title='Price'
            value={selectedRow?.secPrice || 0}
            currency={selectedRow?.trdCcy}
          />
        </DetailCard>
      </div>

      <DetailCard width='42%'>
        <DetailCardContent
          title='Value net in local CCV:'
          value={selectedRow?.marketValTrdCcy || 0}
          currency={selectedRow?.trdCcy}
        />
        {selectedRow?.accrIntTrdCcy ? (
          <DetailCardContent
            title='Accrued interest:'
            value={selectedRow?.accrIntTrdCcy}
            currency={selectedRow?.trdCcy}
          />
        ) : (
          <></>
        )}
        <DetailCardContent
          title='Fees:'
          value={selectedRow?.feesTrdCcy || 0}
          currency={selectedRow?.trdCcy}
        />
        <DetailCardContent
          title='Taxes:'
          value={selectedRow?.taxesTrdCcy || 0}
          currency={selectedRow?.trdCcy}
          mb='30px'
        />
        <DetailCardContent
          title='FX rate:'
          value={selectedRow?.ccyRate || 1}
          digit={6}
          mb='0'
        />
      </DetailCard>
      <DetailCard width='42%'>
        <DetailCardComponent
          title='Total value in portfolio CCY:'
          value={selectedRow?.marketValue || 0}
          currency={selectedRow?.reportCcy}
        />
      </DetailCard>

      <Divider
        sx={{ margin: '0 20px 20px', borderColor: (theme) => theme.palette.gray.light }}
      />

      <FlexBox
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          margin: '0 20px 30px',
        }}
      >
        <div style={{ width: '50%' }}>
          <div style={{ marginBottom: 20 }}>
            <Typography
              variant='subtitle2'
              mb={1.25}
              sx={{ color: (theme) => theme.palette.gray.main, textTransform: 'capitalize' }}
            >
              {handleTranslations(t, 'Portfolio number:')}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{ color: (theme) => theme.palette.black.main }}
            >
              {selectedRow?.portfolioItem}
            </Typography>
          </div>
          <div>
            <Typography
              variant='subtitle2'
              mb={1.25}
              sx={{ color: (theme) => theme.palette.gray.main, textTransform: 'capitalize' }}
            >
              {handleTranslations(t, 'Account number:')}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{ color: (theme) => theme.palette.black.main }}
            >
              {selectedRow?.description3}
            </Typography>
          </div>
        </div>
        <div style={{ width: '50%' }}>
          <Typography
            variant='subtitle2'
            mb={1.25}
            sx={{ color: (theme) => theme.palette.gray.main, textTransform: 'capitalize' }}
          >
            {handleTranslations(t, 'Booking text')}
          </Typography>
          <Typography variant='subtitle1' sx={{ color: (theme) => theme.palette.black.main }}>
            {selectedRow?.DealText1 || 'N/A'}
          </Typography>
        </div>
      </FlexBox>
    </div>
  );
};

export default TransactionTable;
