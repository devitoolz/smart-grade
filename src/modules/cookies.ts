import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, { path: '/' });
};

const getCookie = (name: string) => {
  return cookies.get(name);
};

const removeCookie = (name: string) => {
  return cookies.remove(name, { path: '/' });
};

export { setCookie, getCookie, removeCookie };
