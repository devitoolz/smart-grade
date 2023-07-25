import React, { useState } from 'react';
import { SearchButton, SearchLayout } from '../styles/SearchBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Input from './Input';
import Dropdown from './Dropdown';

const SearchBar = () => {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <SearchLayout>
      <select>
        <option>강의 상태</option>
      </select>
      <input type="text" placeholder="강의명" />
      <input type="text" placeholder="교수명" />
      <SearchButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
      {/* <Dropdown length="long" placeholder="전공" /> */}
    </SearchLayout>
  );
};

export default SearchBar;
