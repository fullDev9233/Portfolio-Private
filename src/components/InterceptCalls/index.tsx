import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/setupInterceptor';
import { AppDispatch } from '../../store';
import { setTokenExiprateState } from '../../store/user/actions';

function InjectAxiosInterceptors() {
  const history = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const apiCalls = () => {
      http.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          if (err?.response?.status === 401) {
            if (err?.response?.data?.message !== 'invalid_bearer_token') {
              localStorage.clear();
              window.location.reload();
            } else {
              dispatch(setTokenExiprateState(true));
            }
          }

          return Promise.reject(err);
        },
      );
    };
    apiCalls();
  }, [dispatch, history]);

  return null;
}

export default InjectAxiosInterceptors;
