import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../apis/api';
import { ObjectType } from '../types/components';

const useQuerySearch = (url: string, click?: boolean) => {
  const location = useLocation();
  const [pending, setIsPending] = useState<boolean>(false);
  const [error, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<ObjectType | Array<any> | null>(null);

  const fetch = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      const { data } = await api.get<ObjectType | Array<any>>(`${url}${location.search}`);
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
  }, [location.search, click]);

  return { data, pending, error };
};

export default useQuerySearch;
