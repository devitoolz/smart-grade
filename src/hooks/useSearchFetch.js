import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

const useQuerySearch = (url, click) => {
  const location = useLocation();
  const [pending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const fetch = async () => {
    setIsPending(true);
    try {
      const { data } = await api.get(`${url}${location.search}`);
      setData(data);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      return;
    }
  };

  useEffect(() => {
    if (!url) return;
    fetch();
  }, [location.search, click]);

  return { data, pending };
};

export default useQuerySearch;
