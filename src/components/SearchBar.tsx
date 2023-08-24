import React from 'react';
import { SearchButton, SearchBarLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchBarProps } from '../types/components';

const SearchBar = ({ children, queries, setPage, setClick }: SearchBarProps) => {
  const [query, setQuery] = useSearchParams();
  const { search } = useLocation();

  const clickSearch = () => {
    if (!queries || Object.keys(queries).length === 0) return;

    const params = search.replace('?', '').split('&');
    params.forEach(item => {
      if (!Object.keys(queries).includes(item.split('=')[0])) {
        query.delete(item.split('=')[0]);
      }
    });

    Object.keys(queries).forEach(key => {
      queries[key] ? query.set(key, queries[key]) : query.delete(key);
    });
    setPage ? query.set('page', '1') : null;
    setQuery(query);
    setClick(prevState => !prevState);
  };

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
