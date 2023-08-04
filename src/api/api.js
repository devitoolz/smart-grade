import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mainSlice from '../slices/mainSlice';
// import { useNavigate } from 'react-router-dom';

const api = axios.create();

const main = mainSlice.actions;

const Interceptor = ({ children }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    api.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          dispatch(main.setIsPosting(true));
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // if (error.response.status === 401) {
        //   navigate('/');
        // }
        return Promise.reject(error);
      }
    );
  }, []);

  return children;
};

export default api;
export { Interceptor };
