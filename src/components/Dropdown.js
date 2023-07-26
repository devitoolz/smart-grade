import React, { useEffect, useState, useRef } from 'react';
import { CustomDropdown } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCircleXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ length, placeholder, data, value, setValue, reset, search }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState([]);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const itemRef = useRef(null);

  const handleMenuOpen = () => {
    itemRef.current?.scrollIntoView({ block: 'start' });
    setIsOpen(!isOpen);
    if (!isOpen) {
      setResult(data || []);
    }
    isOpen ? inputRef.current?.blur() : inputRef.current?.focus();
  };

  const handleOutsideClick = e => {
    if (!menuRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setResult(data || []), 200);
      if (data?.length !== 0 && data?.filter(item => item.title === searchValue).length === 0) {
        setSearchValue('');
      }
    }
  }, [isOpen]);

  const handleItemClick = item => {
    setValue && setValue(item.title);
    setSearchValue(item.title);
    handleMenuOpen();
  };

  const handleResetClick = e => {
    e.stopPropagation();
    setResult(data || []);
    setValue && setValue('');
    setSearchValue('');
    setIsOpen(false);
  };

  const handleSearchValueChange = e => {
    setSearchValue(e.target.value);
    data?.filter(item => item.title === e.target.value).length !== 0
      ? setValue && setValue(e.target.value)
      : setValue && setValue('');
    setResult(data?.filter(item => item.title.includes(e.target.value)) || []);
    itemRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <CustomDropdown ref={menuRef} open={isOpen} length={length} value={searchValue}>
      <div onClick={handleMenuOpen}>
        {search ? (
          <input
            ref={inputRef}
            type="text"
            placeholder={'전체 ' + placeholder}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        ) : (
          <span className={value ? null : 'placeholder'}>
            {value ? value : '전체 ' + placeholder}
          </span>
        )}
        <FontAwesomeIcon icon={faChevronDown} rotation={isOpen ? 180 : 0} />
        {reset && (
          <FontAwesomeIcon className="reset" icon={faCircleXmark} onClick={handleResetClick} />
        )}
      </div>
      <ul>
        {result.length !== 0 ? (
          result.map(item => (
            <li
              ref={item.title === searchValue ? itemRef : null}
              className={item.title === searchValue ? 'active' : null}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <span>{item.title}</span>
            </li>
          ))
        ) : (
          <li className="data-error">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>데이터를 불러오지 못했습니다.</span>
          </li>
        )}
      </ul>
    </CustomDropdown>
  );
};

export default Dropdown;
