import React, { useState } from 'react';
import { CustomDropdown } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ length, placeholder, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    { id: 1, title: '내용 1' },
    { id: 2, title: '내용 2' },
    { id: 3, title: '내용 3' },
  ];

  const handleItemClick = item => {
    setValue(item.title);
    setIsOpen(false);
  };

  return (
    <CustomDropdown
      open={isOpen}
      length={length}
      dataLength={data.length}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>
        {value ? <span>{value}</span> : <span className="placeholder">{placeholder}</span>}
        <FontAwesomeIcon icon={faChevronDown} rotation={isOpen ? 180 : 0} />
      </div>
      <ul>
        {data?.map(item => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </CustomDropdown>
  );
};

export default Dropdown;
