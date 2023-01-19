import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Step, Stepper, useTheme } from '@mui/material';

import AssetForm from '../IlliquidAssetForm';
import AssetTypeSelector from '../NonBankableAssetTypeSelector';
import FlexBox from '../Common/FlexBox';
import SimpleBackdrop from '../Common/Loading';
import NonBankableAssetReview from '../NonBankableAssetReview';
import AlertDialog from '../Common/AlertDialog';

import {
  // ButtonWrapper,
  EtopsConnector,
  StyledStepLabel,
  StepperContainer,
  StyledPaper,
  StyledText,
} from './styles';
import {
  attemptCreateNonBankableAsset,
  toggleNonBankableAssetTab,
} from '../../store/nonBankableAssets/actions';
import { AppDispatch, RootState } from '../../store';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { EtopsStepCheckIcon } from './StepIcon';
import CloseIcon from '../../assets/CloseIcon';

const steps = ['Asset Type', 'Asset Details', 'Review and Submit'];

export default function BookNonBankableAssets() {
  const theme = useTheme();
  const { isLoading, error } = useSelector((state: RootState) => state.nonBankableAssets);
  const { selectedPortfolio, portfolios } = useSelector((state: RootState) => state.portfolio);

  const [activeStep, setActiveStep] = useState(0);
  const [imageFile, setImageFile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [alertDialog, setAlertDialog] = useState(false);
  const [portfolioName, setPortfolioName] = useState<string>('');

  const t = useSelector(selectTranslations);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const foundPortfolio = portfolios.find(
      (singlePortfolio: any) => singlePortfolio.id === selectedPortfolio,
    );
    setPortfolioName(foundPortfolio?.portfolio_name || '');
  }, [selectedPortfolio, portfolios]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setFormData({});
      setImageFile(null);
      setActiveStep(0);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const handleSubmit = useCallback(() => {
    dispatch(
      attemptCreateNonBankableAsset({
        ...formData,
        portfolio: formData.portfolio.id,
        valuationMethod: formData.valuationMethod,
        holdingDisplayType: formData.holdingDisplayType,
        currency: formData.currency.code,
        imageFile,
      }),
    ).then(() => {
      setAlertDialog(true);
    });
  }, [dispatch, formData, imageFile]);

  const discardHandler = () => {
    dispatch(toggleNonBankableAssetTab(0));
  };

  const assetTypeToDisplay =
    activeStep === 0
      ? 'Illiquid Asset'
      : // split word into 2 words.
        formData.assetType.replace(/([a-z])([A-Z])/g, '$1 $2');

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AssetTypeSelector
            updateFormData={setFormData}
            formData={formData}
            handleStep={handleNext}
          />
        );
      case 1:
        return (
          <AssetForm
            handleStep={handleNext}
            handleBack={handleBack}
            formData={formData}
            updateFormData={setFormData}
            setFile={setImageFile}
            imageFile={imageFile}
          />
        );
      case 2:
        return (
          <NonBankableAssetReview
            imageFile={imageFile}
            formData={{
              ...formData,
              portfolio: `${formData?.portfolio?.portfolio_name} ${formData?.portfolio?.id}`,
              currency: formData?.currency?.code,
            }}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100% !important',
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
      }}
    >
      <StyledPaper>
        <StepperContainer>
          <FlexBox sx={{ justifyContent: 'space-between' }}>
            <StyledText variant='h4' align='left' className='form-title'>
              {handleTranslations(t, `Add a new ${assetTypeToDisplay} to`)}{' '}
              {portfolioName && <span style={{ fontWeight: 500 }}>{portfolioName}</span>}
            </StyledText>
            <Button
              endIcon={
                <CloseIcon color={theme.palette.green.dark} sx={{ width: 12, height: 12 }} />
              }
              sx={{
                color: theme.palette.green.dark,
                fontSize: theme.typography.subtitle1.fontSize,
                textTransform: 'capitalize',
              }}
              className='discard-btn'
              onClick={discardHandler}
            >
              Discard
            </Button>
          </FlexBox>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: '30px' }}
            alternativeLabel
            connector={<EtopsConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StyledStepLabel
                  sx={{ fontSize: theme.typography.subtitle1.fontSize }}
                  StepIconComponent={EtopsStepCheckIcon}
                >
                  {handleTranslations(t, label)}
                </StyledStepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperContainer>
        <div style={{ padding: 20 }}>{getStepContent(activeStep)}</div>
      </StyledPaper>
      <SimpleBackdrop open={isLoading} />
      <AlertDialog
        openNow={alertDialog}
        title={error ? 'Error!' : 'Success!'}
        serverMessage={error}
        message={
          error
            ? 'There was an error:'
            : 'The asset and transaction was created successfully.\nCreate another or view the portfolio.'
        }
        success={!error}
        toggleDialog={setAlertDialog}
        reset={handleNext}
        portfolioId={formData?.portfolio?.id}
      />
    </Container>
  );
}
