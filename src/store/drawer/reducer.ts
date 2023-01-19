import { AnyAction } from 'redux';
import {
  POSITION_TOGGLE_DRAWER,
  POSITION_DRAWER_EXPAND,
  TRANSACTION_TOGGLE_DRAWER,
  TOGGLE_ASSET_DETAIL_DRAWER,
  TOGGLE_ADD_VALUATION_DRAWER,
} from './constants';
import { ATTEMPT_GET_PORTFOLIO_TABLE } from '../portfolio/constants';
import { DrawerProps, ReducerAction } from '../../types';

const initialState: DrawerProps = {
  isOpenPosition: false,
  isExpandPosition: false,
  isOpenTransaction: false,
  isOpenAssetDetail: false,
  isOpenAddValuation: false,
};

const portfolio = (state = initialState, { type, payload }: ReducerAction | AnyAction) => {
  switch (type) {
    case POSITION_TOGGLE_DRAWER:
      return {
        ...state,
        isOpenPosition: payload,
      };

    case POSITION_DRAWER_EXPAND:
      return {
        ...state,
        isExpandPosition: payload,
      };

    case ATTEMPT_GET_PORTFOLIO_TABLE:
      return {
        ...state,
        isOpenPosition: false,
      };

    case TRANSACTION_TOGGLE_DRAWER:
      return {
        ...state,
        isOpenTransaction: payload,
      };

    case TOGGLE_ASSET_DETAIL_DRAWER:
      return {
        ...state,
        isOpenAssetDetail: payload,
      };

    case TOGGLE_ADD_VALUATION_DRAWER:
      return {
        ...state,
        isOpenAddValuation: payload,
      };

    default:
      return state;
  }
};

export default portfolio;
