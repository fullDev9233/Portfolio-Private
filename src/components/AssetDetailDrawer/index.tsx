import { useQuery } from '@apollo/client';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import Drawer from '../Common/Drawer';
import FlexBox from '../Common/FlexBox';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { ILLIQUID_ASSET_QUERY } from '../../services/GraphQL/nonBankableAssets';
import { RootState, AppDispatch } from '../../store';
import { toggleAssetDetailDrawer } from '../../store/drawer/actions';
import { formatNumbers } from '../../utils/formatNumbers';
import { createImage } from '../../utils/createImage';
import { IlliquidAssetQuery, IlliquidAssetQueryVariables } from '../../gql/graphql';

interface AssetCardProps {
  title: string;
  value?: string | number;
  isBold?: boolean;
  isLast?: boolean;
  className?: string;
}

const AssetCard = ({ title, value, isBold, isLast, className }: AssetCardProps) => {
  const t = useSelector(selectTranslations);

  return (
    <Grid
      item
      xs={6}
      sx={{ marginBottom: isLast ? 0 : 2.5, padding: '0 !important' }}
      className={className}
    >
      <Typography
        variant='body2'
        mb='5px'
        sx={{ color: (theme) => theme.palette.black.light }}
      >
        {handleTranslations(t, title)}
      </Typography>
      <Typography
        variant='subtitle1'
        sx={{ color: (theme) => theme.palette.black.main, fontWeight: isBold ? 'bold' : 400 }}
      >
        {value}
      </Typography>
    </Grid>
  );
};

const AssetDetailDrawer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpenAssetDetail } = useSelector((state: RootState) => state.drawer);
  const { illiquidAsset } = useSelector((state: RootState) => state.nonBankableAssets);
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];
  const illiquidAssetId = illiquidAsset?.illiquidAsset.id;

  const { loading, data } = useQuery<IlliquidAssetQuery, IlliquidAssetQueryVariables>(
    ILLIQUID_ASSET_QUERY,
    {
      variables: { illiquidAssetId },
    },
  );

  const toggleDrawer = () => {
    dispatch(toggleAssetDetailDrawer(false));
  };

  return (
    <>
      <Drawer
        variant='permanent'
        hideBackdrop={true}
        anchor={'right'}
        open={isOpenAssetDetail}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            marginTop: '68px !important',
            overflow: 'hidden',
            width: '410px',
            padding: (theme) => theme.spacing(2.5),
          },
        }}
      >
        <Grid>
          <IconButton
            onClick={toggleDrawer}
            size='large'
            sx={{ margin: '-9px 0 0 -9px', padding: '5px' }}
          >
            <LastPageIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
          </IconButton>
        </Grid>
        {loading ? (
          <FlexBox sx={{ height: '370px', justifyContent: 'center' }}>
            <CircularProgress />
          </FlexBox>
        ) : (
          data && (
            <>
              <Typography
                variant='h5'
                mt={1.5}
                mb={3.75}
                sx={{ color: (theme) => theme.palette.primary.dark }}
              >
                {data.illiquidAsset?.name}
              </Typography>
              <Grid container>
                <AssetCard
                  title='CURRENCY'
                  className='asset-currency'
                  value={data.illiquidAsset?.currency}
                />
                <AssetCard
                  title='INSTRUMENT TYPE'
                  className='asset-instrument-type'
                  value={data.illiquidAsset?.instrumentType}
                />
                <AssetCard
                  title='VALUATION'
                  className='asset-valuation'
                  isBold
                  isLast
                  value={
                    data.illiquidAsset?.lastValuation?.valuation
                      ? formatNumbers(
                          data.illiquidAsset.lastValuation.valuation,
                          currentLocale,
                        )
                      : ''
                  }
                />
                <AssetCard
                  title='DATE OF VALUATION'
                  className='date-of-valuation'
                  isLast
                  value={
                    data.illiquidAsset?.lastValuation?.valuationDate
                      ? format(
                          new Date(data.illiquidAsset.lastValuation.valuationDate),
                          'dd.MM.yyyy',
                        )
                      : ''
                  }
                />
              </Grid>
              {data.illiquidAsset?.image && (
                <img
                  src={createImage(data.illiquidAsset.image)}
                  alt='Asset'
                  style={{ marginTop: '60px', borderRadius: 8 }}
                />
              )}
            </>
          )
        )}
      </Drawer>
    </>
  );
};

export default AssetDetailDrawer;
