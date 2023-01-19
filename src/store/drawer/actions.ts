import {
  POSITION_TOGGLE_DRAWER,
  POSITION_DRAWER_EXPAND,
  TRANSACTION_TOGGLE_DRAWER,
  TOGGLE_ASSET_DETAIL_DRAWER,
  TOGGLE_ADD_VALUATION_DRAWER,
} from './constants';

export const togglePositionDrawer = (isOpen: boolean) => {
  return {
    type: POSITION_TOGGLE_DRAWER,
    payload: isOpen,
  };
};

export const expandPositionDrawer = (isExpand: boolean) => {
  return {
    type: POSITION_DRAWER_EXPAND,
    payload: isExpand,
  };
};

export const toggleTransactionDrawer = (isOpen: boolean) => {
  return {
    type: TRANSACTION_TOGGLE_DRAWER,
    payload: isOpen,
  };
};

export const toggleAssetDetailDrawer = (isOpen: boolean) => {
  return {
    type: TOGGLE_ASSET_DETAIL_DRAWER,
    payload: isOpen,
  };
};

export const toggleAddValuationDrawer = (isOpen: boolean) => {
  return {
    type: TOGGLE_ADD_VALUATION_DRAWER,
    payload: isOpen,
  };
};
