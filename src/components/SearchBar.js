import React from 'react';
import { SearchButton, SearchBarLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ children, queries, setPage }) => {
  const [query, setQuery] = useSearchParams();

  const clickSearch = () => {
    if (!queries || Object.keys(queries).length === 0) {
      console.log('no queries');
      return;
    }

    Object.keys(queries).forEach(key => {
      queries[key] ? query.set(key, queries[key]) : query.delete(key);
    });
    setPage ? query.set('page', 1) : null;
    setQuery(query);
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
