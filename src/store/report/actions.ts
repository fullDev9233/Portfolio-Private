import { Dispatch } from 'redux';
import { getReportByteString } from '../../services/myApi/reportApi';
import { createPdf } from '../../utils/createPDF';
import { ATTEMPT_GET_REPORT, GET_REPORT_FAIL, GET_REPORT_SUCCESS } from './constants';

export const getReportSuccess = (data: any) => {
  return {
    type: GET_REPORT_SUCCESS,
    payload: data,
  };
};

export const getReportFail = (error: any) => {
  return {
    type: GET_REPORT_FAIL,
    payload: error,
  };
};

export const createReport = (reportData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: ATTEMPT_GET_REPORT });
  try {
    const { bytes }: { bytes: string } = (await getReportByteString(reportData)) as any;
    if (bytes) createPdf(bytes);
    dispatch(getReportSuccess(null));
  } catch (error: any) {
    console.log(error);
    dispatch(getReportFail(error.message || error));
  }
};
