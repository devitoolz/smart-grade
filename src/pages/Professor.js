import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Layout } from '../styles/CommonStyle';
import Input from '../components/Input';

const Professor = () => {
  const [majorList, setMajorList] = useState([]);

  const [major, setMajor] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // TODO: 추후 axios GET으로 변경
    const majorData = [
      { id: 1, title: '내용 1' },
      { id: 2, title: '내용 2' },
      { id: 3, title: '내용 3' },
      { id: 4, title: '내용 4' },
      { id: 5, title: '내용 5' },
    ];

    setMajorList(majorData);
  }, []);

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
