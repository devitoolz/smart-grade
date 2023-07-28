import React from 'react';
import { SearchButton, SearchBarLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ children, onSearch }) => {
  return (
    <SearchBarLayout>
      {children}
      <SearchButton onClick={onSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchBarLayout>
  );
};

export default SearchBar;
