import { Dispatch } from 'redux';
import { getInstrumentData, getTransactionsData } from '../../services/myApi';
import {
  ContextMenuDataLoadStatusProps,
  InstrumentProps,
  TransactionProps,
} from '../../types';
import {
  SET_POSITION_DATA,
  GET_INSTRUMENT_SUCCESS,
  GET_INSTRUMENT_FAIL,
  ATTEMPT_GET_INSTRUMENT,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  ATTEMPT_GET_TRANSACTIONS,
  SET_TOGGLE_MENU,
  SELECT_TRANSACTION,
  SET_CONTEXTMENUDATA_LOAD_STATUS,
} from './constants';

export const setPositionData = (positionData: any) => {
  return {
    type: SET_POSITION_DATA,
    payload: positionData,
  };
};

// Fetch Instrument Data
export const getInstrumentSuccess = (data: InstrumentProps) => {
  return {
    type: GET_INSTRUMENT_SUCCESS,
    payload: data,
  };
};

export const getInstrumentFail = (error: any) => {
  return {
    type: GET_INSTRUMENT_FAIL,
    payload: error,
  };
};

export const attemptGetInstrument = (isin: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_INSTRUMENT });
  try {
    const data = await getInstrumentData(isin);
    dispatch(getInstrumentSuccess(data));
  } catch (error: any) {
    dispatch(getInstrumentFail(error.message || error));
  }
};

// Fetch Transactions Data
export const getTransactionsSuccess = (data: TransactionProps[]) => {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: data,
  };
};

export const getTransactionsFail = (error: any) => {
  return {
    type: GET_TRANSACTIONS_FAIL,
    payload: error,
  };
};

export const attemptGetTransactions =
  (portfolioId: string, isin: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ATTEMPT_GET_TRANSACTIONS });
    try {
      const data = await getTransactionsData(portfolioId, isin);
      dispatch(getTransactionsSuccess(data));
    } catch (error: any) {
      dispatch(getTransactionsFail(error.message || error));
    }
  };

// Set toggleMenu
export const setToggleMenu = (menu: number) => {
  return {
    type: SET_TOGGLE_MENU,
    payload: menu,
  };
};

export const selectTransaction = (row: any) => {
  return {
    type: SELECT_TRANSACTION,
    payload: row,
  };
};

export const setContextMenuDataLoadStatus = (status: ContextMenuDataLoadStatusProps) => {
  return {
    type: SET_CONTEXTMENUDATA_LOAD_STATUS,
    payload: status,
  };
};
