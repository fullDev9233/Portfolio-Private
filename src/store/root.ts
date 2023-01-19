import { combineReducers } from 'redux';

import { LOGOUT } from './user/constants';

import userReducer from './user/reducer';
import portfolioReducer from './portfolio/reducer';
import i18nReducer from './i18n/reducer';
import positionReducer from './position/reducer';
import viewReducer from './view/reducer';
import nonBankableAssetReducer from './nonBankableAssets/reducer';
import reportReducer from './report/reducer';
import sidebarReducer from './sidebar/reducer';
import transactionReducer from './transaction/reducer';
import drawerReducer from './drawer/reducer';
import modalReducer from './modal/reducer';

const appReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  i18n: i18nReducer,
  position: positionReducer,
  view: viewReducer,
  nonBankableAssets: nonBankableAssetReducer,
  report: reportReducer,
  sidebar: sidebarReducer,
  transaction: transactionReducer,
  drawer: drawerReducer,
  modal: modalReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem('persist:root');

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
