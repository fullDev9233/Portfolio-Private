import axios from './setupInterceptor';

export const setAuthToken = (token: string) => {
  const bearerToken = 'Bearer ' + token;
  if (token) {
    //Apply to every request
    return (axios.defaults.headers.common['Authorization'] = bearerToken);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};
