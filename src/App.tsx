import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { setCurrentUser } from './store/user/actions';
import { getTranslations } from './store/i18n/actions';
import { AppDispatch, RootState } from './store';

import InjectAxiosInterceptors from './components/InterceptCalls';
import PrivateRouter from './PrivateRouter';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import ReAuthModal from './components/ReAuthModal';

const Login = lazy(() => import('./pages/Login/Login'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const AnalysisTable = lazy(() => import('./pages/AnalysisTable'));
const ReportingPage = lazy(() => import('./pages/Reporting'));
const NonBankable = lazy(() => import('./pages/NonBankable'));

const App = () => {
  const { isLoggedIn, isTokenExpired, isMounted } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTranslations());
      dispatch(setCurrentUser(isLoggedIn, isMounted));
    }
  }, [dispatch, isLoggedIn, isMounted]);

  return (
    <>
      <InjectAxiosInterceptors />
      <ReAuthModal isOpen={isTokenExpired} />
      <Suspense fallback={<DefaultLayout></DefaultLayout>}>
        <DefaultLayout>
          <Routes>
            <Route
              path='/login'
              element={!isLoggedIn ? <Login /> : <Navigate to='/dashboard' replace />}
            />
            <Route
              path='/'
              element={
                <PrivateRouter>
                  <Navigate to='/dashboard' replace />
                </PrivateRouter>
              }
            />
            <Route
              path='/dashboard'
              element={
                <PrivateRouter>
                  <DashBoard />
                </PrivateRouter>
              }
            />
            <Route
              path='/analysis'
              element={
                <PrivateRouter>
                  <AnalysisTable />
                </PrivateRouter>
              }
            />
            <Route
              path='/reporting'
              element={
                <PrivateRouter>
                  <ReportingPage />
                </PrivateRouter>
              }
            />
            <Route
              path='/illiquid-assets'
              element={
                <PrivateRouter>
                  <NonBankable />
                </PrivateRouter>
              }
            />
            <Route
              path='*'
              element={
                <PrivateRouter>
                  <Navigate to='/dashboard' replace />
                </PrivateRouter>
              }
            />
          </Routes>
        </DefaultLayout>
      </Suspense>
    </>
  );
};

export default App;
