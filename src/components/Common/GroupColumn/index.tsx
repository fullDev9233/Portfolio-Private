import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import FlexBox from '../FlexBox';
import AssetIcon from '../../../assets/AssetIcon';
import { handleTranslations } from '../../../store/i18n/handleTranslations';
import { selectTranslations } from '../../../store/i18n/reducer';

interface GropColumnProps {
  name: string;
}

const GroupColumn = ({ name }: GropColumnProps) => {
  const t = useSelector(selectTranslations);

  return (
    <FlexBox>
      <AssetIcon />
      <Typography
        sx={{
          fontSize: (theme) => theme.typography.body2.fontSize,
          color: (theme) => theme.palette.black.light,
        }}
        ml='5px'
      >
        {handleTranslations(t, name)}
      </Typography>
    </FlexBox>
  );
};

export default GroupColumn;
