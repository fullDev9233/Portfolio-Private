import { Stack, Typography } from '@mui/material';
import CameraImage from '../../../assets/add_photo@2x.png';

const FileUploadInput = ({ t, handleTranslations }: any) => {
  return (
    <>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
        <img style={{ height: 82, width: 82 }} src={CameraImage} alt='camera' />
        <Typography color='textSecondary'>
          {handleTranslations(t, 'Drag and drop an image, or Browse')}
        </Typography>
        <Typography color='textSecondary'>
          {handleTranslations(t, '1600x1200 or higher recommended. Max 10MB')}
        </Typography>
      </Stack>
    </>
  );
};

export default FileUploadInput;
