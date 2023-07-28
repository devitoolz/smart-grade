import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuerySearch = (url, click) => {
  const location = useLocation();

  const fetch = async () => {
    try {
      await axios.get(`${url}${location.search}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!url) return;
    fetch();
  }, [location.search, click]);
};

export default useQuerySearch;
