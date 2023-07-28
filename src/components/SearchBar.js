import React, { useState } from 'react';
import { SearchButton, SearchBarLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useSearchParams } from 'react-router-dom';
import useQuerySearch from '../hooks/useSearchFetch';

const SearchBar = ({ children, queries, setPage, url }) => {
  const [query, setQuery] = useSearchParams();
  const { search } = useLocation();
  const [click, setClick] = useState(false);

  const clickSearch = () => {
    if (!queries) return;

    const params = search.replace('?', '').split('&');
    params.forEach(item => {
      if (!Object.keys(queries).includes(item.split('=')[0])) {
        query.delete(item.split('=')[0]);
      }
    });

    if (!queries || Object.keys(queries).length === 0) {
      console.log('no queries');
      return;
    }

    Object.keys(queries).forEach(key => {
      queries[key] ? query.set(key, queries[key]) : query.delete(key);
    });
    setPage ? query.set('page', 1) : null;
    setQuery(query);
    setClick(!click);
  };

  useQuerySearch(url, click);

  return (
    <SearchBarLayout>
      {children}
      <SearchButton onClick={clickSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchBarLayout>
  );
};

export default SearchBar;
