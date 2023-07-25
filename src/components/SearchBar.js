import React, { useState } from 'react';
import { SearchButton, SearchLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Input from './Input';
import Dropdown from './Dropdown';

const SearchBar = ({ children }) => {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <SearchLayout>
      {children}
      <SearchButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
      {/* <Dropdown length="long" placeholder="전공" /> */}
    </SearchLayout>
  );
};

export default SearchBar;
