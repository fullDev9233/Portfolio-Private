import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

export default function RowContextMenu({
  contextMenu,
  handleClose,
  options,
  handleMenuClick,
}: any) {
  const t = useSelector(selectTranslations);

  return (
    <>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        componentsProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
        sx={{
          '& .MuiPaper-root': { boxShadow: '0px 2px 6px #00000033' },
          '& .MuiList-root.MuiMenu-list': { padding: '10px 0' },
        }}
      >
        {options.map((element: string, id: number) => (
          <MenuItem
            key={`pa-portfolio-${id}`}
            sx={{
              width: '170px',
              fontSize: (theme) => theme.typography.subtitle1.fontSize,
              '&:hover': {
                backgroundColor: (theme) => `${theme.palette.other.main} !important`,
                color: (theme) => `${theme.palette.primary.dark}`,
              },
            }}
            onClick={() => handleMenuClick(id)}
          >
            {handleTranslations(t, element)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
