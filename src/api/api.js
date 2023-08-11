import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mainSlice from '../slices/mainSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../modules/cookies';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
  // withCredentials: true,
});

const main = mainSlice.actions;

const Interceptor = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeAuth = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
  };

  const requestInterceptor = api.interceptors.request.use(
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

  const responseInterceptor = api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: { status },
      } = error;

      const refreshToken = getCookie('refreshToken');

      if (status === 401 && refreshToken) {
        console.log('토큰 만료! 갱신 시도');
        try {
          const { data } = await api.get(`/api/refresh-token?refreshToken=${refreshToken}`);
          console.log('갱신 성공');
          const accessToken = data.accessToken;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', data.refreshToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } catch (error) {
          removeAuth();
          alert('인증에 실패하여 로그인 페이지로 이동합니다.');
          navigate('/');
        }
      }

      if (status === 401 && !refreshToken) {
        removeAuth();
        alert('인증 정보가 없습니다. 로그인 페이지로 이동합니다.');
        navigate('/');
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);

  return children;
};

export default api;
export { Interceptor };
