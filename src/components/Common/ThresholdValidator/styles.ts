import { styled } from '@mui/material/styles';

const Container = styled('div')<{
  value?: number;
  threshold: number;
  ischart?: string;
  istooltip?: string;
}>`
  display: flex;
  align-items: center;
  font-size: ${({ ischart, istooltip, theme }) =>
    ischart === 'true'
      ? istooltip === 'true'
        ? `${theme.typography.subtitle2.fontSize}px`
        : `${theme.typography.h1.fontSize}px`
      : `${theme.typography.subtitle1.fontSize}px`};
  font-weight: ${({ ischart }) => (ischart === 'true' ? 700 : 400)};
  color: ${({ value, threshold, theme }) => {
    let color;
    if (value === undefined) color = theme.palette.white.dark;
    else {
      if (value === 0) color = theme.palette.gray.dark;
      else if (value >= threshold) color = theme.palette.green.dark;
      else color = theme.palette.red.dark;
    }
    return color;
  }};
`;

export default Container;
