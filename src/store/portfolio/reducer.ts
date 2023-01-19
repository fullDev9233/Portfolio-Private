import { AnyAction } from 'redux';
import { PortfolioState, ReducerAction } from '../../types';
import {
  ATTEMPT_GET_PORTFOLIOS,
  ATTEMPT_GET_PORTFOLIO_TABLE,
  GET_PORTFOLIOS_FAIL,
  GET_PORTFOLIOS_SUCCESS,
  GET_PORTFOLIO_TABLE_FAIL,
  GET_PORTFOLIO_TABLE_SUCCESS,
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
  GET_DAILY_PERFORMANCE_FAIL,
  GET_DAILY_PERFORMANCE_SUCCESS,
  ATTEMPT_GET_DAILY_PERFORMANCE,
  ATTEMPT_GET_PORTFOLIO_TRANSACTIONS,
  GET_PORTFOLIO_TRANSACTIONS_FAIL,
  GET_PORTFOLIO_TRANSACTIONS_SUCCESS,
  VALIDATE_COMPONENT_DASHBOARD_MOUNT,
  VALIDATE_COMPONENT_PA_MOUNT,
  VALIDATE_COMPONENT_TRANSACTION_MOUNT,
} from './constants';

const initialState: PortfolioState = {
  isLoading: false,
  performersIsLoading: false,
  maturitiesIsLoading: false,
  allocationsIsLoading: false,
  dailyPerformanceIsLoading: false,
  tableDataIsLoaded: false,
  portfolioTableData: {},
  assetClasses: [],
  transactions: [],
  selectedPortfolio: '',
  portfolios: [],
  dashboardPortfolios: [],
  performers: {
    bestPerformers: [],
    worstPerformers: [],
  },
  maturities: {
    maturities: [],
  },
  allocations: {
    assetClassAllocations: [],
    currencyAllocations: [],
  },
  dailyPerformance: [],
  portfolioId: '',
  error: '',
  isDashboardMount: false,
  isPAMount: false,
  isPATransactionMount: false,
};

const portfolio = (state = initialState, { type, payload }: ReducerAction | AnyAction) => {
  switch (type) {
    case ATTEMPT_GET_PORTFOLIO_TABLE:
      return {
        ...state,
        isLoading: true,
        portfolioTableData: {},
        assetClasses: [],
      };
    case GET_PORTFOLIO_TABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tableDataIsLoaded: true,
        portfolioTableData: payload,
        assetClasses: payload.assetClasses,
      };
    case GET_PORTFOLIO_TABLE_FAIL:
      return {
        ...state,
        isLoading: false,
        tableDataIsLoaded: false,
        error: payload,
      };
    case ATTEMPT_GET_PORTFOLIOS:
      return {
        ...state,
        isLoading: true,
        portfolios: [],
      };
    case GET_PORTFOLIOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        portfolios: payload.filter((pf: any) => pf.id !== 'virtualConsolidation'),
        dashboardPortfolios: payload,
      };
    case GET_PORTFOLIOS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ATTEMPT_GET_PERFORMERS:
      return {
        ...state,
        performersIsLoading: true,
      };
    case GET_PERFORMERS_SUCCESS:
      return {
        ...state,
        performersIsLoading: false,
        performers: payload,
      };
    case GET_PERFORMERS_FAIL:
      return {
        ...state,
        performersIsLoading: false,
        error: payload,
      };

    case ATTEMPT_GET_DAILY_PERFORMANCE:
      return {
        ...state,
        dailyPerformanceIsLoading: true,
      };
    case GET_DAILY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        dailyPerformanceIsLoading: false,
        dailyPerformance: payload,
      };
    case GET_DAILY_PERFORMANCE_FAIL:
      return {
        ...state,
        dailyPerformanceIsLoading: false,
        error: payload,
      };

    case ATTEMPT_GET_MATURITIES:
      return {
        ...state,
        maturitiesIsLoading: true,
      };
    case GET_MATURITIES_SUCCESS:
      return {
        ...state,
        maturitiesIsLoading: false,
        maturities: payload,
      };
    case GET_MATURITIES_FAIL:
      return {
        ...state,
        maturitiesIsLoading: false,
        error: payload,
      };

    case ATTEMPT_GET_ALLOCATIONS:
      return {
        ...state,
        allocationsIsLoading: true,
      };
    case GET_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allocationsIsLoading: false,
        allocations: payload,
      };
    case GET_ALLOCATIONS_FAIL:
      return {
        ...state,
        allocationsIsLoading: false,
        error: payload,
      };

    case ATTEMPT_GET_PORTFOLIO_TRANSACTIONS:
      return {
        ...state,
        isLoading: true,
        transactions: [],
      };

    case GET_PORTFOLIO_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: payload,
      };
    case GET_PORTFOLIO_TRANSACTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        transactions: [],
      };

    case SET_SELECTED_PORTFOLIO:
      return {
        ...state,
        selectedPortfolio: payload,
      };

    case SET_PORTFOLIO_ID:
      return {
        ...state,
        portfolioId: payload,
      };

    case VALIDATE_COMPONENT_DASHBOARD_MOUNT:
      return {
        ...state,
        isDashboardMount: payload,
      };

    case VALIDATE_COMPONENT_PA_MOUNT:
      return {
        ...state,
        isPAMount: payload,
      };

    case VALIDATE_COMPONENT_TRANSACTION_MOUNT:
      return {
        ...state,
        isPATransactionMount: payload,
      };

    default:
      return state;
  }
};

export default portfolio;
