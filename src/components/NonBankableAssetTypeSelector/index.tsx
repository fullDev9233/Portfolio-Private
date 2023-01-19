import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, useMediaQuery } from '@mui/material';

import { AppDispatch, RootState } from '../../store';
import { attemptGetFormFields } from '../../store/nonBankableAssets/actions';
import EtopsGreenButton from '../Common/EtopsButton';
import NonBankableToggleButtons from '../NonBankableToggleButtons';
import FormSectionText from '../Common/FormSectionText';
import FormSectionDivider from '../Common/FormSectionDivider';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';

export default function AssetTypeSelector({ handleStep, updateFormData, formData }: any) {
  const matches = useMediaQuery('(min-width: 1000px)');
  const dispatch: AppDispatch = useDispatch();

  const t = useSelector(selectTranslations);
  const { selectedPortfolio, portfolios } = useSelector((state: RootState) => state.portfolio);

  const [assetType, setAssetType] = useState(formData?.assetType || '');
  const [error, setError] = useState(false);

  const handleAssetTypeChange = useCallback((value: string) => {
    setAssetType(value);
    setError(false);
  }, []);

  const handleSubmit = () => {
    if (assetType && selectedPortfolio) {
      const foundPortoflio = portfolios.find(
        (singlePf: any) => singlePf.id === selectedPortfolio,
      );
      updateFormData({ assetType, portfolio: foundPortoflio });
      dispatch(attemptGetFormFields(assetType)).then(() => handleStep());
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <FormSectionDivider styles={{ maxWidth: 933, paddingRight: 0 }} />
            <FormSectionText style={{ paddingBottom: 42 }}>
              {handleTranslations(t, 'Asset Type')}
            </FormSectionText>
          </Grid>

          <Grid item container paddingLeft={matches ? 13 : 0}>
            <Grid item xs={12} style={{ marginBottom: 90 }}>
              <NonBankableToggleButtons
                handleAssetTypeChange={handleAssetTypeChange}
                assetType={assetType}
              />
              {error && (
                <>
                  <Typography variant='inherit' color='textSecondary'>
                    {handleTranslations(t, 'An asset type must be selected!')}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='flex-end' style={{ maxWidth: 935 }}>
          <EtopsGreenButton
            className='add-asset-details'
            sx={{ width: 190 }}
            onClick={handleSubmit}
          >
            {handleTranslations(t, 'Add Asset Details')}
          </EtopsGreenButton>
        </Grid>
      </Grid>
    </>
  );
}
