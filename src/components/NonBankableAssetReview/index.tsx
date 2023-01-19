import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import EtopsGreenButton from '../Common/EtopsButton';
import BackButton from '../Common/BackButton';
import {
  AssetImage,
  ButtonWrapper,
  Container,
  ContentsWrapper,
  Image,
  StyledFieldText,
  StyledValueText,
} from './styles';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';

import InvestmentImg from '../../assets/placeholder_investment.png';
import CollectionImg from '../../assets/placeholder_collection.png';
import InsuranceImg from '../../assets/placeholder_insurance.png';
import RealEstateImg from '../../assets/placeholder_realestate.png';
import { formatNumbers } from '../../utils/formatNumbers';
import { RootState } from '../../store';

const images = [
  {
    value: 'RealEstate',
    img: RealEstateImg,
  },
  {
    value: 'Collection',
    img: CollectionImg,
  },
  {
    value: 'Investment',
    img: InvestmentImg,
  },
  {
    value: 'Insurance',
    img: InsuranceImg,
  },
];
interface NonBankableAssetReviewProps {
  formData: any;
  imageFile: File;
  handleBack: () => void;
  handleSubmit: () => void;
}

const NonBankableAssetReview = ({
  formData,
  imageFile,
  handleBack,
  handleSubmit,
}: NonBankableAssetReviewProps) => {
  const theme = useTheme();
  const t = useSelector(selectTranslations);
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];

  const [asset, setAsset] = useState<any>(null);

  useEffect(() => {
    const selected = images.filter((_asset) => _asset.value === formData.assetType);
    setAsset(selected[0]);
  }, [formData]);

  return (
    <Container hasImage={imageFile || asset}>
      {imageFile ? (
        <Image src={URL.createObjectURL(imageFile)} alt={imageFile.name} />
      ) : (
        asset && <AssetImage src={asset.img} alt='Placeholder' />
      )}
      <section style={{ maxWidth: 550 }}>
        <Typography
          mb='37px'
          sx={{
            font: 'normal normal bold 22px/29px Roboto',
            color: `${theme.palette.black.main} !important`,
            textTransform: 'capitalize',
          }}
          className='assetName-review'
        >
          {formData['assetName']}
        </Typography>
        <ContentsWrapper>
          {Object.keys(formData).map((fieldKey) => {
            return fieldKey === 'valuationMethod' || fieldKey === 'holdingDisplayType' ? (
              ''
            ) : (
              <div key={fieldKey}>
                <StyledFieldText sx={{ marginBottom: '5px' }}>
                  {handleTranslations(t, fieldKey.replace(/([a-z])([A-Z])/g, '$1 $2'))}
                </StyledFieldText>
                <StyledValueText>
                  {Number.isInteger(formData[fieldKey])
                    ? formatNumbers(formData[fieldKey], currentLocale)
                    : formData[fieldKey]}
                </StyledValueText>
              </div>
            );
          })}
        </ContentsWrapper>
        <ButtonWrapper sx={{ mt: 9, mb: 4.5 }}>
          <BackButton
            className='back-btn-review'
            sx={{ mr: '50px', width: '100px' }}
            onClick={handleBack}
          >
            {handleTranslations(t, 'Back')}
          </BackButton>
          <EtopsGreenButton
            className='submit-btn-review'
            sx={{ width: '100px' }}
            onClick={handleSubmit}
          >
            {handleTranslations(t, 'Submit')}
          </EtopsGreenButton>
        </ButtonWrapper>
      </section>
    </Container>
  );
};

export default NonBankableAssetReview;
