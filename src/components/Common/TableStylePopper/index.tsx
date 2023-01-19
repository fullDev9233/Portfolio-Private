import { useState, useRef, MouseEvent } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import {
  useGridApiContext,
  gridVisibleSortedRowIdsSelector,
  GridDensity,
} from '@mui/x-data-grid-premium';
import { useSelector } from 'react-redux';
import {
  DensityElement,
  FlexBox,
  StyledButton,
  StyledPopper,
  SwitchGroup,
  SwitchBar,
  Switch,
  // TypographyTitle,
} from './styles';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';
import AdjustIcon from '../../../assets/AdjustIcon';

const TableStylePopper = () => {
  const node = useRef<HTMLDivElement>(null);
  const apiRef = useGridApiContext();
  const t = useSelector(selectTranslations);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [densityId, setDensityId] = useState(0);
  const [active, setActive] = useState(true);

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleChange = (_id: number) => {
    let density: GridDensity;
    if (_id === 0) density = 'compact';
    else if (_id === 1) density = 'standard';
    else density = 'comfortable';
    apiRef.current.setDensity(density);

    setDensityId(_id);
    setOpen(false);
  };

  const onSwitch = () => {
    const rowIds = gridVisibleSortedRowIdsSelector(apiRef).filter((rowId: any) =>
      rowId.startsWith('auto'),
    ) as string[];
    // don't do anything if rows are not grouped
    if (rowIds.length >= 1) {
      rowIds.forEach((singleId: string) => {
        // if there is a multi level grouping always open the nested rows;
        const slashCount = singleId.length - singleId.replaceAll('/', '').length;
        if (slashCount > 1) {
          apiRef.current.setRowChildrenExpansion(singleId, true);
        } else {
          apiRef.current.setRowChildrenExpansion(singleId, !active);
        }
      });
    }
    setActive((prev) => !prev);
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div ref={node}>
      <div style={{ paddingRight: 21 }}>
        <StyledButton
          variant='outlined'
          aria-describedby={id}
          startIcon={<AdjustIcon width={18} height={18} />}
          onClick={handleClick}
        >
          {handleTranslations(t, 'Table Style')}
        </StyledButton>
      </div>

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ left: '210px !important', top: '-0px !important' }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <section className='density' style={{ margin: '0 0 30px' }}>
                <Typography
                  variant='body2'
                  sx={{
                    marginBottom: '10px',
                    color: (theme) => theme.palette.black.light,
                  }}
                >
                  {handleTranslations(t, 'DENSITY')}
                </Typography>
                <FlexBox>
                  {['Compact', 'Standard', 'Comfortable'].map((element, idx) => (
                    <DensityElement
                      key={element}
                      active={`${idx === densityId}`}
                      onClick={() => handleChange(idx)}
                    >
                      {handleTranslations(t, element)}
                    </DensityElement>
                  ))}
                </FlexBox>
              </section>
              <section className='collapse-group'>
                <Typography
                  variant='body2'
                  sx={{
                    marginBottom: '10px',
                    color: (theme) => theme.palette.black.light,
                  }}
                >
                  {handleTranslations(t, 'COLLAPSE GROUPS')}
                </Typography>
                <SwitchGroup onClick={onSwitch}>
                  <SwitchBar />
                  <Switch active={`${active}`} />
                </SwitchGroup>
              </section>
            </Box>
          </Fade>
        )}
      </StyledPopper>
    </div>
  );
};

export default TableStylePopper;
