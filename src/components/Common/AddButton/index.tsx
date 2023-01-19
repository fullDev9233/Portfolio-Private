import { ButtonProps } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { StyledButton } from '../BackButton/styles';
// import { EtopsPlusIcon } from '../../assets/AddIcon';

const AddButton = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <>
      <StyledButton {...rest} onClick={onClick} startIcon={<AddOutlinedIcon />}>
        {children}
      </StyledButton>
    </>
  );
};

export default AddButton;
