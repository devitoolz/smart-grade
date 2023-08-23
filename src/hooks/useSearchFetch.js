import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

const useQuerySearch = (url, click) => {
  const location = useLocation();
  const [pending, setIsPending] = useState(false);
  const [error, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const fetch = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      const { data } = await api.get(`${url}${location.search}`);
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
