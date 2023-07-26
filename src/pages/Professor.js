import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';

const Professor = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, title: '내용 1' },
      { id: 2, title: '내용 2' },
      { id: 3, title: '내용 3' },
      { id: 4, title: '내용 4' },
      { id: 5, title: '내용 5' },
      { id: 6, title: '내용 6' },
      { id: 7, title: '내용 7' },
      { id: 8, title: '내용 8' },
      { id: 9, title: '내용 9' },
      { id: 10, title: '내용 10' },
      { id: 11, title: '내용 11' },
      { id: 12, title: '내용 12' },
    ];

    setData(data);
  }, []);

  return (
    <div style={{ background: 'blue' }}>
      <SearchBar onSearch={() => console.log(value)}>
        <Dropdown
          length="long"
          placeholder="전공"
          data={data}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
      </SearchBar>
    </div>
  );
};

export default Professor;
