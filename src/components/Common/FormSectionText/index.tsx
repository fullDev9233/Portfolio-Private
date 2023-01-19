import { StyledText } from './styled';

const FormSectionText = ({ children, ...props }: any) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default FormSectionText;
