import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useSearchFetch = url => {
  const location = useLocation();

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get(`${url}${location.search}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [location]);
};

export default useSearchFetch;
