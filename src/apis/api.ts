import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ReactNode, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import mainSlice from '../slices/mainSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../modules/cookies';

const api = axios.create({
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
  // withCredentials: true,
});

// const main = mainSlice.actions;

const removeAuth = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  location.href = '/';
};

const getAuth = () => {
  const accessToken: string = getCookie('accessToken');
  const refreshToken: string = getCookie('refreshToken');
  return Boolean(accessToken && refreshToken);
};

const Interceptor = ({ children }: { children: ReactNode }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestInterceptor = api.interceptors.request.use(config => {
    const accessToken: string = getCookie('accessToken');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    // if (config.method === 'post') {
    //   dispatch(main.setIsPosting(true));
    // }
    return config;
  });

  const responseInterceptor = api.interceptors.response.use(
    response => {
      return response;
    },
    async (error: AxiosError | Error) => {
      const refreshToken: string = getCookie('refreshToken');
      if (axios.isAxiosError(error)) {
        const config = error.config as InternalAxiosRequestConfig;
        const response = error.response as AxiosResponse;

        if (!response || response.status === 500) {
          removeAuth();
          alert('서버와의 연결이 원활하지 않습니다.');
          navigate('/');
        } else if (response.status === 401 && refreshToken) {
          try {
            // TODO: data 타입 지정
            const { data } = await api.get(`/api/refresh-token?refreshToken=${refreshToken}`);
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
      } else {
        console.log(error);
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
export { Interceptor, removeAuth, getAuth };
