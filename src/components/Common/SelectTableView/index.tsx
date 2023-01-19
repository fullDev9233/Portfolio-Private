import { Box, Fade, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  useGridApiContext,
  gridRowGroupingSanitizedModelSelector,
  gridColumnVisibilityModelSelector,
  gridDensityRowHeightSelector,
} from '@mui/x-data-grid-premium';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexBox, StyledButton, StyledPopper, TypographyTitle } from './styles';
import SelectTableViewModal from '../SelectTableViewModal';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { AppDispatch, RootState } from '../../../store';
import {
  createNewUserLayout,
  deleteSelectedView,
  updateUserLayout,
  setSelectedView,
  getAllUserViews,
} from '../../../store/view/actions';
import { toggleSelectTableView } from '../../../store/modal/actions';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';
import { ModalParamsProps, TableViewScope } from '../../../types/selectTableView';
import CheckIcon from '../../../assets/check@2x.png';
import DeleteIcon from '../../../assets/DeleteIcon';
import EditIcon from '../../../assets/EditIcon';
import EyeIcon from '../../../assets/EyeIcon';

const rowHeights: any = {
  36: 'compact',
  52: 'standard',
  67: 'comfortable',
};

const SelectTableView = ({ tableScope }: { tableScope: TableViewScope }) => {
  const apiRef = useGridApiContext();
  const currentLayout = apiRef.current.exportState();
  const groupingModel = gridRowGroupingSanitizedModelSelector(apiRef);
  const columnModel = gridColumnVisibilityModelSelector(apiRef);
  const pinnedColumns = apiRef.current.getPinnedColumns();
  const rowDensity = rowHeights[gridDensityRowHeightSelector(apiRef)];
  const t = useSelector(selectTranslations);

  const dispatch: AppDispatch = useDispatch();
  const { views, selectedView, hasViews, isLoading, error } = useSelector(
    (state: RootState) => state.view,
  );
  const { isOpenTableView } = useSelector((state: RootState) => state.modal);

  const node = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(0);
  const [newLabel, setNewLabel] = useState('');
  const [modalOpened, setModalOpened] = useState({
    isAdd: false,
    isEdit: false,
    isDelete: false,
  });
  const [modalParams, setModalParams] = useState<ModalParamsProps>({
    title: '',
    content: '',
    okName: '',
    cancelName: '',
  });
  const [editId, setEditId] = useState('');

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  useEffect(() => {
    if ((!views.length && hasViews) || (views.length && views[0].tableScope !== tableScope))
      dispatch(getAllUserViews(tableScope) as any);
    if (selectedView && views.length) {
      const foundView = views.find((singleView: any) => singleView.name === selectedView);
      if (foundView && foundView.tableScope === tableScope) {
        handleSetActiveView(selectedView);
      } else {
        handleSetActiveView('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [views]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleAddChange = () => {
    dispatch(toggleSelectTableView(true));
    setNewLabel('');
    setModalOpened({
      isAdd: true,
      isEdit: false,
      isDelete: false,
    });
    setModalParams({
      title: 'Save Table View',
      content: '',
      okName: 'Save View',
      cancelName: '',
    });
  };

  const handleEditChange = (element: any) => {
    dispatch(toggleSelectTableView(true));
    setNewLabel(element.name);
    setEditId(element._id);
    setModalOpened({
      isAdd: false,
      isEdit: true,
      isDelete: false,
    });
    setModalParams({
      title: 'Edit Table View',
      content: '',
      okName: 'Update View',
      cancelName: '',
    });
  };

  const handleDeleteChange = (element: any) => {
    dispatch(toggleSelectTableView(true));
    setEditId(element._id);
    setModalOpened({
      isAdd: false,
      isEdit: false,
      isDelete: true,
    });
    setModalParams({
      title: 'Delete View',
      content: `${handleTranslations(t, 'Would you like to delete')} ${element.name}?`,
      okName: 'Delete View',
      cancelName: 'Cancel',
    });
  };

  const handleChange = (element: any) => {
    setSelectedId(element._id);
  };

  const handleSelect = (element: any) => {
    dispatch(setSelectedView(element.name));
    handleSetActiveView(element.name);
  };

  const onAdd = useCallback(() => {
    dispatch(setSelectedView(newLabel));
    dispatch(
      createNewUserLayout({
        tableScope,
        name: newLabel,
        layout: { ...currentLayout, groupingModel, columnModel, pinnedColumns, rowDensity },
      }),
    );
  }, [
    tableScope,
    columnModel,
    currentLayout,
    dispatch,
    groupingModel,
    newLabel,
    pinnedColumns,
    rowDensity,
  ]);

  const onEdit = useCallback(() => {
    dispatch(setSelectedView(newLabel));
    dispatch(
      updateUserLayout({
        id: editId,
        layout: { ...currentLayout, groupingModel, columnModel, pinnedColumns, rowDensity },
        name: newLabel,
      }),
    );
  }, [
    columnModel,
    currentLayout,
    dispatch,
    editId,
    groupingModel,
    newLabel,
    pinnedColumns,
    rowDensity,
  ]);

  const onDelete = useCallback(() => {
    dispatch(setSelectedView(''));
    dispatch(deleteSelectedView(editId));
  }, [dispatch, editId]);

  const handleSetActiveView = (viewName: string) => {
    const foundView = views.find((view: any) => view.name === viewName);
    if (foundView) {
      const {
        layout: {
          groupingModel: _groupingModel,
          columnModel: _columnModel,
          pinnedColumns: _pinnedColumns,
          rowDensity: _rowDensity,
          ...rest
        },
      }: any = foundView;
      apiRef.current.restoreState(rest);
      apiRef.current.setRowGroupingModel(_groupingModel);
      apiRef.current.setColumnVisibilityModel(_columnModel);
      apiRef.current.setPinnedColumns(_pinnedColumns || {});
      apiRef.current.setDensity(_rowDensity);
    } else {
      dispatch(setSelectedView(''));
    }
  };

  return (
    <>
      <div ref={node}>
        <FlexBox>
          <StyledButton
            variant='outlined'
            aria-describedby={id}
            startIcon={<EyeIcon width={18} height={18} />}
            endIcon={
              open ? (
                <KeyboardArrowUpIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
              )
            }
            onClick={handleClick}
          >
            {selectedView || handleTranslations(t, 'Select Table View')}
          </StyledButton>
        </FlexBox>
        <StyledPopper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ minWidth: 300 }}>
                <FlexBox sx={{ padding: '20px 20px 15px' }}>
                  <EyeIcon width={18} height={18} />
                  <TypographyTitle variant='subtitle1'>
                    {handleTranslations(t, 'Select Table View')}
                  </TypographyTitle>
                </FlexBox>
                <section
                  className='density'
                  style={{ maxHeight: '300px', overflowY: 'scroll' }}
                >
                  {views.map((element: any) => (
                    <FlexBox
                      key={element._id}
                      sx={{
                        padding: '8px 0',
                        justifyContent: 'space-between',
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.other.main,
                          '& .MuiTypography-subtitle1': {
                            color: (theme) => theme.palette.primary.dark,
                          },
                        },
                      }}
                      onMouseOver={() => handleChange(element)}
                    >
                      <FlexBox
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSelect(element)}
                      >
                        <div style={{ width: '35px' }} />
                        {selectedView === element.name ? (
                          <img src={CheckIcon} width={10} height={7} alt='CheckIcon' />
                        ) : (
                          <div style={{ width: 10 }} />
                        )}
                        <Typography
                          variant='subtitle1'
                          sx={{ ml: '10px', color: (theme) => theme.palette.black.main }}
                        >
                          {element.name}
                        </Typography>
                      </FlexBox>
                      {selectedId === element._id && (
                        <FlexBox sx={{ marginRight: '10px' }}>
                          <EditIcon
                            sx={{ cursor: 'pointer', margin: '0 15px 0 45px' }}
                            onClick={() => handleEditChange(element)}
                          />
                          <DeleteIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteChange(element)}
                          />
                        </FlexBox>
                      )}
                    </FlexBox>
                  ))}
                </section>
                <StyledButton
                  variant='outlined'
                  aria-describedby={id}
                  startIcon={<AddIcon width={18} height={18} />}
                  sx={{
                    margin: '15px 20px 20px',
                    padding: '4px 5px 4px 0',
                    fontWeight: 500,
                  }}
                  onClick={handleAddChange}
                >
                  {handleTranslations(t, 'Add Table View')}
                </StyledButton>
              </Box>
            </Fade>
          )}
        </StyledPopper>
      </div>
      <SelectTableViewModal
        isOpenModal={isOpenTableView}
        newLabel={newLabel}
        setNewLabel={!modalOpened.isDelete ? setNewLabel : undefined}
        modalParams={modalParams}
        error={error}
        isLoading={isLoading}
        handleModalChange={modalOpened.isAdd ? onAdd : modalOpened.isEdit ? onEdit : onDelete}
      />
    </>
  );
};

export default SelectTableView;
