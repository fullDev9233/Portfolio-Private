import { styled, Theme } from '@mui/material/styles';
import { DataGridPremium, DataGridPremiumProps, gridClasses } from '@mui/x-data-grid-premium';

export const StyledDataDrid = styled(DataGridPremium)<DataGridPremiumProps>(({ theme }) => ({
  [`& .${gridClasses.row}.group`]: {
    fontWeight: 'bold',
    fontSize: theme.typography.subtitle1.fontSize,
    '& .MuiDataGrid-cellContent': {
      fontWeight: 'bold',
    },
  },
  background: `${theme.palette.white.dark} 0% 0% no-repeat padding-box`,
  border: 'none',
  borderRadius: '0 0 8px 8px',
  '& .MuiDataGrid-columnHeader:last-of-type, .MuiDataGrid-cell:last-of-type': {
    paddingRight: theme.spacing(2.5),
  },
  '& .MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-cell:first-of-type': {
    paddingLeft: theme.spacing(2.5),
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: `${theme.palette.other.main} !important`,
    },
    '&.Mui-selected': {
      backgroundColor: `${theme.palette.orange.light} !important`,
      border: `1px solid ${theme.palette.amber.main}`,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 'normal',
    letterSpacing: ' 0.22px',
    color: theme.palette.black.light,
    lineHeight: 13,
    textTransform: 'uppercase',
  },
  '& .MuiDataGrid-cellContent': {
    fontSize: theme.typography.subtitle1.fontSize,
    font: theme.typography.responsiveH3.font,
    letterSpacing: 0,
    color: theme.palette.black.main,
  },
  '& .MuiDataGrid-selectedRowCount': {
    visibility: 'hidden',
  },
  '& .MuiDataGrid-toolbarContainer': {
    margin: '14px 0 0',
    '& .MuiButton-text': {
      fontSize: theme.typography.subtitle1.fontSize,
      color: theme.palette.primary.dark,
      textTransform: 'capitalize',
    },
    '& .MuiBadge-badge': {
      minWidth: 15,
      width: 15,
      height: 15,
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.white.dark,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: 700,
    },
    '& .MuiButton-startIcon': {
      marginRight: '10px',
    },
  },
  '& .MuiDataGrid-cell--withRenderer .MuiBox-root': {
    '& .MuiDataGrid-groupingCriteriaCellToggle': {
      marginRight: 0,
    },
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.mixed.light,
    borderRadius: '0 0 8px 8px',
    '& .MuiDataGrid-rowCount': {
      margin: `0 ${theme.spacing(2.5)}`,
      textTransform: 'uppercase',
    },
  },
}));

export const FilterPanelProps = (theme: Theme) => {
  return {
    columnsSort: 'asc',
    filterFormProps: {
      columnInputProps: {
        variant: 'outlined',
        size: 'small',
        sx: { mt: 'auto' },
      },
      operatorInputProps: {
        variant: 'outlined',
        size: 'small',
        sx: { mt: 'auto' },
      },
      valueInputProps: {
        variant: 'outlined',
        size: 'small',
      },
      deleteIconProps: { sx: { order: 999 } },
    },
    sx: {
      '& .MuiDataGrid-filterForm': {
        padding: '20px 20px 0 20px',
      },
      '& .MuiDataGrid-panelFooter': {
        padding: '30px 12px 20px',
      },
      '& .MuiDataGrid-filterFormDeleteIcon': {
        margin: 'auto',
        padding: 0,
        '& svg': {
          color: theme.palette.primary.dark,
          stroke: theme.palette.primary.dark,
        },
      },
      '& .MuiDataGrid-filterFormLinkOperatorInput': {
        minWidth: 'fit-content',
        marginRight: '15px',
        '& .MuiInputBase-formControl': {
          fontSize: theme.typography.subtitle1.fontSize,
          color: theme.palette.primary.dark,
          '& select': {
            textTransform: 'lowercase',
          },
          '& svg': {
            color: theme.palette.primary.dark,
          },
        },
        '& .MuiInputBase-formControl:before, .MuiInputBase-formControl:hover, .MuiInputBase-formControl:after':
          {
            border: 'none',
          },
      },
      '& .MuiDataGrid-filterFormColumnInput, .MuiDataGrid-filterFormOperatorInput, .MuiDataGrid-filterFormValueInput':
        {
          marginRight: '15px',
          width: '250px',
          '& label': {
            display: 'none',
          },
          '& .MuiInputBase-formControl': {
            fontSize: theme.typography.subtitle1.fontSize,
            color: theme.palette.black.main,
            '&:before, :hover, :hover:not(.Mui-disabled):before, :after': {
              border: 'none',
            },
            '& select': {
              padding: '16px 11px',
              textTransform: 'capitalize',
            },
            '& svg': {
              color: theme.palette.black.contrastText,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '8px',
              border: `1px solid ${theme.palette.gray.contrastText}`,
              top: 0,
              '& legend': {
                display: 'none',
              },
            },
          },
        },
      '& .MuiDataGrid-filterFormOperatorInput': {
        width: '120px',
        '& .MuiInputBase-formControl': {
          color: theme.palette.primary.dark,
          '& select': {
            textTransform: 'lowercase',
            textAlign: 'end',
            marginRight: '20px',
          },
          '& svg': {
            color: theme.palette.primary.dark,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            display: 'none',
          },
        },
      },
      '& .MuiDataGrid-filterFormValueInput': {
        border: `1px solid ${theme.palette.gray.contrastText}`,
        borderRadius: '8px',
        '& .MuiInputBase-formControl': {
          marginTop: 0,
          padding: '16px 10px',
          '& input': {
            padding: 0,
            height: 'auto',
          },
        },
      },
    },
  };
};

export const ColumnsPanelProps = (theme: Theme) => {
  return {
    '& .MuiDataGrid-panelHeader': {
      padding: 2.5,
      '& .MuiFormControl-root.MuiTextField-root': {
        border: `1px solid ${theme.palette.gray.contrastText}`,
        borderRadius: '8px',
        '& .MuiFormLabel-root.MuiInputLabel-root': {
          color: `${theme.palette.black.light} !important`,
          top: '-11px',
          left: '6px',
          background: theme.palette.white.dark,
          padding: '6px',
        },
        '& .MuiInputBase-root.MuiInput-root': {
          paddingLeft: '10px',
          font: theme.typography.responsiveH3.font,
          letterSpacing: '0px',
          color: theme.palette.black.main,
          '&:before, :after': {
            border: 'none',
          },
        },
      },
    },
    '& .MuiDataGrid-columnsPanel': {
      padding: '0 0 0 20px',
      '& .MuiDataGrid-columnsPanelRow': {
        padding: '8px 8px 8px 7px',
        '& .MuiFormControlLabel-root': {
          '& .MuiSwitch-root.MuiSwitch-sizeSmall': {
            '& .MuiSwitch-track.MuiSwitch-track': {
              height: '3px',
              backgroundColor: theme.palette.gray.contrastText,
              marginTop: '4px',
            },
            '& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked': {
              color: theme.palette.green.dark,
            },
          },
          '& .MuiFormControlLabel-label': {
            font: theme.typography.responsiveH5.font,
            letterSpacing: '0.22px',
            color: theme.palette.black.light,
          },
        },
      },
    },
    '& .MuiDataGrid-panelFooter': {
      padding: '12px 9px',
      '& button': {
        font: 'normal normal medium 14px/19px Roboto',
        letterSpacing: '0px',
        color: theme.palette.primary.dark,
        textTransform: 'capitalize',
      },
    },
  };
};

export const MenuPanelProps = (theme: Theme) => {
  return {
    boxShadow: '0px 2px 6px #00000033',
    ul: {
      padding: '10px 0',
      li: {
        padding: '8px 20px',
        fontSize: theme.typography.subtitle1.fontSize,
        textTransform: 'capitalize',
        ':hover': {
          backgroundColor: theme.palette.other.main,
          color: theme.palette.primary.main,
        },
      },
    },
  };
};
