import { ButtonProps } from '@mui/material';
import { StyledButton } from './styles';

const SaveButton = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <>
      <StyledButton {...rest} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
};

export default SaveButton;
