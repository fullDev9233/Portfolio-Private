import { AnyAction } from 'redux';
import {
  ContextMenuDataLoadStatusProps,
  InstrumentProps,
  ReducerAction,
  TransactionProps,
} from '../../types';
import { InitialInstrument } from './initialState';
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

export interface PoisitionState {
  isLoading: boolean;
  error: string;
  selectedPosition: any;
  instrumentData: InstrumentProps;
  transactionsData: TransactionProps[];
  toggleMenu: number;
  selectedRow: any;
  contextMenuDataIsLoaded: ContextMenuDataLoadStatusProps;
}

const initialState: PoisitionState = {
  isLoading: false,
  selectedPosition: {},
  error: '',
  instrumentData: InitialInstrument,
  transactionsData: [],
  toggleMenu: -1,
  selectedRow: {},
  contextMenuDataIsLoaded: {
    instrument: false,
    position: false,
    transaction: false,
  },
};

const users = (state = initialState, { type, payload }: ReducerAction | AnyAction) => {
  switch (type) {
    case SET_POSITION_DATA:
      return {
        ...state,
        selectedPosition: payload,
      };

    case GET_INSTRUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        instrumentData: payload,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactionsData: payload,
      };
    case GET_INSTRUMENT_FAIL:
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case ATTEMPT_GET_INSTRUMENT:
      return {
        ...state,
        isLoading: true,
        instrumentData: {},
      };
    case ATTEMPT_GET_TRANSACTIONS:
      return {
        ...state,
        isLoading: true,
        transactionsData: [],
      };

    case SET_TOGGLE_MENU:
      return {
        ...state,
        toggleMenu: payload,
      };

    case SET_CONTEXTMENUDATA_LOAD_STATUS:
      return {
        ...state,
        contextMenuDataIsLoaded: payload,
      };

    case SELECT_TRANSACTION:
      return {
        ...state,
        selectedRow: payload,
      };
    default:
      return state;
  }
};

export default users;
