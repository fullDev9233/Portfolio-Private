import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './store';

interface PrivateRouteProps {
  children: any;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return isLoggedIn ? children : <Navigate to='/login' replace />;
};

export default memo(PrivateRoute);
