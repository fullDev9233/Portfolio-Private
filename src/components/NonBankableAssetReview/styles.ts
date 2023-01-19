import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFieldText = styled(Typography)<TypographyProps>(({ theme }) => ({
  font: theme.typography.responsiveH5.font,
  letterSpacing: 0.22,
  color: `${theme.palette.black.light} !important`,
  textTransform: 'uppercase',
  opacity: 1,
}));

export const StyledValueText = styled(Typography)<TypographyProps>(({ theme }) => ({
  font: theme.typography.responsiveH3.font,
  letterSpacing: 0,
  color: `${theme.palette.black.main} !important`,
  textTransform: 'capitalize',
  opacity: 1,
}));

export const Container = styled('div')<any>(({ hasImage, theme }) => ({
  display: 'grid',
  gridTemplateColumns: hasImage ? '432px 480px' : '0.5fr',
  gap: '85px',
  [theme.breakpoints.down(1180)]: {
    gridTemplateColumns: hasImage ? '1fr' : '0.5fr',
    gap: '40px',
  },
  [theme.breakpoints.down(800)]: {
    gridTemplateColumns: '1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}));

export const Image = styled('img')<any>(({ theme }) => ({
  height: '388px',
  width: '432px',
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down(630)]: {
    width: '100%',
    height: 'auto',
  },
}));

export const ContentsWrapper = styled('div')`
  display: grid;
  grid-template-columns: 160px 1fr;
  column-gap: 20px;
  row-gap: 40px;
  ${({ theme }) => theme.breakpoints.down(630)} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ButtonWrapper = styled('div')<any>(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: 0,
}));

export const AssetImage = styled('img')(({ theme }) => ({
  justifyContent: 'center',
  height: '420px',
  width: '420px',
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down(630)]: {
    width: '100%',
    height: 'auto',
  },
}));
