import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Layout } from '../styles/CommonStyle';
import Input from '../components/Input';
import { useSelector } from 'react-redux';

const Professor = () => {
  const [major, setMajor] = useState(null);
  const [name, setName] = useState('');

  const { majorList } = useSelector(state => state.major);

  return (
    <Layout>
      <SearchBar onSearch={() => console.log(major, name)}>
        <Dropdown
          length="long"
          placeholder="전공"
          data={majorList}
          value={major}
          setValue={setMajor}
          reset
          search
        />
        <Input length="short" type="text" placeholder="이름" value={name} setValue={setName} />
      </SearchBar>
    </Layout>
  );
};

export default Professor;
