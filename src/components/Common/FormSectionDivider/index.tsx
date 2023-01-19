import { Divider } from '@mui/material';

const FormSectionDivider = ({ styles }: any) => {
  return (
    <div style={{ paddingRight: 72, ...styles }}>
      <Divider />
    </div>
  );
};

export default FormSectionDivider;
