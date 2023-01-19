import { ButtonProps } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { StyledButton } from './styles';

const BackButton = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <>
      <StyledButton {...rest} onClick={onClick} startIcon={<ChevronLeftOutlinedIcon />}>
        {children}
      </StyledButton>
    </>
  );
};

export default BackButton;
