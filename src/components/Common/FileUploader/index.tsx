/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';
import FileUploadInput from '../FileUploaderInput';
import FormSectionDivider from '../FormSectionDivider';
import FormSectionText from '../FormSectionText';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

const FileUploader = ({ setFile, handleStep, imageFile, handleBack }: any) => {
  const theme = useTheme();
  const t = useSelector(selectTranslations);

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    if (status === 'removed') {
      setFile(null);
    } else if (status === 'done') {
      setFile(file);
    }
  };

  return (
    <>
      <FormSectionDivider />
      <FormSectionText>{handleTranslations(t, 'Asset Photos')}</FormSectionText>

      <div style={{ paddingLeft: 104, paddingRight: 72 }}>
        <Dropzone
          initialFiles={imageFile ? [imageFile] : undefined}
          maxFiles={1}
          onChangeStatus={handleChangeStatus}
          accept='image/*'
          inputContent={FileUploadInput({ t, handleTranslations })}
          styles={{
            dropzone: {
              background: `${theme.palette.white.main} 0% 0% no-repeat padding-box`,
              border: `1px dashed ${theme.palette.gray.contrastText}`,
              borderRadius: '8px',
              opacity: 1,
              height: 250,
            },
            preview: { height: '100%' },
            previewImage: { height: 216, maxWidth: 300, maxHeight: 216 },
            dropzoneActive: { borderColor: theme.palette.green.dark },
          }}
        />
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <BackButton onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </BackButton>
        <EtopsGreenButton onClick={handleStep} sx={{ mt: 3, ml: 1 }}>
          Next
        </EtopsGreenButton>
      </Box> */}
      </div>
    </>
  );
};

export default FileUploader;
