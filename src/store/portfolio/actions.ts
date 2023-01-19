import { Dispatch } from 'redux';

import {
  getPortfolioTableData,
  getAllPortfolios,
  getPerformersTableData,
  getMaturitiesTableData,
  getAllocationsData,
  getDailyPerformanceData,
  getPortfolioTransactions,
} from '../../services/myApi';
import {
  ATTEMPT_GET_PORTFOLIO_TABLE,
  GET_PORTFOLIO_TABLE_FAIL,
  GET_PORTFOLIO_TABLE_SUCCESS,
  GET_PORTFOLIOS_FAIL,
  GET_PORTFOLIOS_SUCCESS,
  ATTEMPT_GET_PORTFOLIOS,
  SET_SELECTED_PORTFOLIO,
  ATTEMPT_GET_PERFORMERS,
  GET_PERFORMERS_SUCCESS,
  GET_PERFORMERS_FAIL,
  ATTEMPT_GET_MATURITIES,
  GET_MATURITIES_SUCCESS,
  GET_MATURITIES_FAIL,
  ATTEMPT_GET_ALLOCATIONS,
  GET_ALLOCATIONS_SUCCESS,
  GET_ALLOCATIONS_FAIL,
  SET_PORTFOLIO_ID,
  ATTEMPT_GET_DAILY_PERFORMANCE,
  GET_DAILY_PERFORMANCE_FAIL,
  GET_DAILY_PERFORMANCE_SUCCESS,
  GET_PORTFOLIO_TRANSACTIONS_SUCCESS,
  GET_PORTFOLIO_TRANSACTIONS_FAIL,
  ATTEMPT_GET_PORTFOLIO_TRANSACTIONS,
  VALIDATE_COMPONENT_DASHBOARD_MOUNT,
  VALIDATE_COMPONENT_PA_MOUNT,
  VALIDATE_COMPONENT_TRANSACTION_MOUNT,
} from './constants';

export const setSelectedPortfolio = (data: string) => {
  return {
    type: SET_SELECTED_PORTFOLIO,
    payload: data,
  };
};

export const getPortfolioTableDataSuccess = (data: any) => {
  return {
    type: GET_PORTFOLIO_TABLE_SUCCESS,
    payload: data,
  };
};

export const getPortfolioTableDataFail = (error: any) => {
  return {
    type: GET_PORTFOLIO_TABLE_FAIL,
    payload: error,
  };
};

export const getAllPortfoliosSuccess = (data: any) => {
  return {
    type: GET_PORTFOLIOS_SUCCESS,
    payload: data,
  };
};

export const getAllPortfoliosFail = (error: any) => {
  return {
    type: GET_PORTFOLIOS_FAIL,
    payload: error,
  };
};

export const attemptGetPortfolioTableData =
  (portfolioId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ATTEMPT_GET_PORTFOLIO_TABLE });
    try {
      const data = await getPortfolioTableData(portfolioId);
      dispatch(getPortfolioTableDataSuccess(data));
    } catch (error: any) {
      dispatch(getPortfolioTableDataFail(error.message));
    }
  };

export const attemptGetAllPortoflios = () => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_PORTFOLIOS });
  try {
    const data = await getAllPortfolios();
    dispatch(getAllPortfoliosSuccess(data));
  } catch (error: any) {
    dispatch(getAllPortfoliosFail(error.message));
  }
};

// Fetch Performers Table Data
export const getPerformersSuccess = (data: any) => {
  return {
    type: GET_PERFORMERS_SUCCESS,
    payload: data,
  };
};

export const getPerformersFail = (error: any) => {
  return {
    type: GET_PERFORMERS_FAIL,
    payload: error,
  };
};

export const attemptGetPerformers = (portfolioId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_PERFORMERS });
  try {
    const data = await getPerformersTableData(portfolioId);
    dispatch(getPerformersSuccess(data));
  } catch (error: any) {
    dispatch(getPerformersFail(error.message || error));
  }
};

// Fetch Maturities Table Data
export const getMaturitiesSuccess = (data: any) => {
  return {
    type: GET_MATURITIES_SUCCESS,
    payload: data,
  };
};

export const getMaturitiesFail = (error: any) => {
  return {
    type: GET_MATURITIES_FAIL,
    payload: error,
  };
};

export const attemptGetMaturities = (portfolioId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_MATURITIES });
  try {
    const data = await getMaturitiesTableData(portfolioId);
    dispatch(getMaturitiesSuccess(data));
  } catch (error: any) {
    dispatch(getMaturitiesFail(error.message || error));
  }
};

// Fetch Allocations Table Data
export const getAllocationsSuccess = (data: any) => {
  return {
    type: GET_ALLOCATIONS_SUCCESS,
    payload: data,
  };
};

export const getAllocationsFail = (error: any) => {
  return {
    type: GET_ALLOCATIONS_FAIL,
    payload: error,
  };
};

export const attemptGetAllocations = (portfolioId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_ALLOCATIONS });
  try {
    const data = await getAllocationsData(portfolioId);
    dispatch(getAllocationsSuccess(data));
  } catch (error: any) {
    dispatch(getAllocationsFail(error.message || error));
  }
};

// Fetch Daily Performance Data
export const getDailyPerformanceSuccess = (data: any) => {
  return {
    type: GET_DAILY_PERFORMANCE_SUCCESS,
    payload: data,
  };
};

export const getDailyPerformanceFail = (error: any) => {
  return {
    type: GET_DAILY_PERFORMANCE_FAIL,
    payload: error,
  };
};

export const attemptGetDailyPerformance =
  (portfolioId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ATTEMPT_GET_DAILY_PERFORMANCE });
    try {
      const data = await getDailyPerformanceData(portfolioId);
      dispatch(getDailyPerformanceSuccess(data));
    } catch (error: any) {
      dispatch(getDailyPerformanceFail(error.message || error));
    }
  };

// Fetch Performers Table Data
export const getPortfolioTransactionsSuccess = (data: any) => {
  return {
    type: GET_PORTFOLIO_TRANSACTIONS_SUCCESS,
    payload: data,
  };
};

export const getPortfolioTransactionsFail = (error: any) => {
  return {
    type: GET_PORTFOLIO_TRANSACTIONS_FAIL,
    payload: error,
  };
};

export const attemptGetPortfolioTransactions =
  (portfolioId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ATTEMPT_GET_PORTFOLIO_TRANSACTIONS });
    try {
      const data = await getPortfolioTransactions(portfolioId);
      dispatch(getPortfolioTransactionsSuccess(data));
    } catch (error: any) {
      dispatch(getPortfolioTransactionsFail(error.message || error));
    }
  };

export const setPortfolioId = (portfolioId: string) => {
  return {
    type: SET_PORTFOLIO_ID,
    payload: portfolioId,
  };
};

export const setDashboardComponentMount = (isMounted: boolean) => {
  return {
    type: VALIDATE_COMPONENT_DASHBOARD_MOUNT,
    payload: isMounted,
  };
};

export const setPAComponentMount = (isMounted: boolean) => {
  return {
    type: VALIDATE_COMPONENT_PA_MOUNT,
    payload: isMounted,
  };
};

export const setPATransactionMount = (isMounted: boolean) => {
  return {
    type: VALIDATE_COMPONENT_TRANSACTION_MOUNT,
    payload: isMounted,
  };
};
