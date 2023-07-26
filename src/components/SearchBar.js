import React from 'react';
import { SearchButton, SearchLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ children, onSearch }) => {
  return (
    <SearchLayout>
      {children}
      <SearchButton onClick={onSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchLayout>
  );
};

export default SearchBar;
