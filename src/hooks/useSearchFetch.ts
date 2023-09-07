import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../apis/api';
import { ObjectType } from '../types/components';

const useQuerySearch = (url: string, click?: boolean) => {
  const { search } = useLocation();
  const [pending, setIsPending] = useState<boolean>(false);
  const [error, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<ObjectType | Array<any> | null>(null);

  const queryList = search.replace('?', '').split('&');
  const newQueryList = queryList.map(query => {
    if (query.includes('page=')) {
      let temp = query.split('=');
      temp[1] = (parseInt(temp[1]) - 1).toString();
      return temp;
    }
    return query.split('=');
  });

  let result = newQueryList.join('&').replace(/,/gi, '=');
  result ? (result += '?') : result;

  const fetch = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      const { data } = await api.get<ObjectType | Array<any>>(`${url}${result}`);
      setData(data);
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setIsPending(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!url) return;
    fetch();
  }, [search, click]);

  return { data, pending, error };
};

export default useQuerySearch;
