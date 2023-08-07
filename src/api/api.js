import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mainSlice from '../slices/mainSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../modules/cookies';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  // withCredentials: true,
});

const main = mainSlice.actions;

const Interceptor = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api.interceptors.request.use(
      config => {
        const accessToken = getCookie('accessToken');
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

        // if (config.method === 'post') {
        //   dispatch(main.setIsPosting(true));
        // }

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
      async error => {
        const {
          config,
          response: { status },
        } = error;

        if (status === 401) {
          console.log('토큰 만료! 갱신 시도');
          try {
            const { data } = await api.get(
              `/api/refresh-token?refreshToken=${getCookie('refreshToken')}`
            );
            const accessToken = data.accessToken;
            setCookie('accessToken', accessToken);
            setCookie('refreshToken', data.refreshToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          } catch (error) {
            console.log(error);
            removeCookie('accessToken');
            removeCookie('refreshToken');
            navigate('/');
          }
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return children;
};

export default api;
export { Interceptor };
