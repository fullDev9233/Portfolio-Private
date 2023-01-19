import { AnyAction } from 'redux';
import { ReducerAction } from '../../types';
import { ATTEMPT_GET_REPORT, GET_REPORT_FAIL, GET_REPORT_SUCCESS } from './constants';

export interface ReportState {
  isLoading: boolean;
  error: string;
  pdfBytes: string;
}

const initialState: ReportState = {
  isLoading: false,
  pdfBytes: '',
  error: '',
};

const users = (state = initialState, { type, payload }: ReducerAction | AnyAction) => {
  switch (type) {
    case ATTEMPT_GET_REPORT:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        pdfBytes: payload,
        isLoading: false,
      };
    case GET_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        pdfBytes: '',
        error: payload,
      };
    default:
      return state;
  }
};

export default users;
