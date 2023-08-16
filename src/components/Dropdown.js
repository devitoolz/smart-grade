import React, { useEffect, useState, useRef } from 'react';
import { CustomDropdown } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCircleXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({
  isForm,
  length,
  placeholder,
  data,
  value,
  setValue,
  propertyName,
  reset,
  search,
  disabled,
}) => {
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
    value &&
      setSearchValue(
        data?.find(item => item[propertyName ? propertyName.key : 'id'] === value)?.[
          propertyName ? propertyName.value : 'title'
        ]
      );
  }, [value]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setResult(data || []), 200);
      if (
        data?.length !== 0 &&
        data?.filter(item => item[propertyName ? propertyName.value : 'title'] === searchValue)
          .length === 0
      ) {
        setSearchValue('');
      }
    }
  }, [isOpen]);

  const handleItemClick = item => {
    setValue && setValue(item[propertyName ? propertyName.key : 'id']);
    setSearchValue(item[propertyName ? propertyName.value : 'title']);
    handleMenuOpen();
  };

  const handleResetClick = e => {
    e.stopPropagation();
    setResult(data || []);
    setValue && setValue(null);
    setSearchValue('');
    setIsOpen(false);
  };

  const handleSearchValueChange = e => {
    setSearchValue(e.target.value);
    const find = data?.find(
      item => item[propertyName ? propertyName.value : 'title'] === e.target.value
    );
    find
      ? setValue && setValue(find[propertyName ? propertyName.key : 'id'])
      : setValue && setValue(null);
    setResult(
      data?.filter(item =>
        item[propertyName ? propertyName.value : 'title'].includes(e.target.value)
      ) || []
    );
    itemRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <CustomDropdown ref={menuRef} open={isOpen} isForm={isForm} length={length} value={searchValue}>
      <div onClick={disabled ? null : handleMenuOpen}>
        {!disabled && search ? (
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        ) : (
          <span className={value ? null : 'placeholder'}>
            {value
              ? data?.find(item => item[propertyName ? propertyName.key : 'id'] === value)?.[
                  propertyName ? propertyName.value : 'title'
                ]
              : placeholder}
          </span>
        )}
        {!disabled && <FontAwesomeIcon icon={faChevronDown} rotation={isOpen ? 180 : 0} />}
        {!disabled && reset && (
          <FontAwesomeIcon className="reset" icon={faCircleXmark} onClick={handleResetClick} />
        )}
      </div>
      <ul>
        {result.length !== 0 ? (
          result.map(item => (
            <li
              ref={
                item[propertyName ? propertyName.value : 'title'] === searchValue ? itemRef : null
              }
              className={
                item[propertyName ? propertyName.value : 'title'] === searchValue ? 'active' : null
              }
              key={item[propertyName ? propertyName.key : 'id']}
              onClick={() => handleItemClick(item)}
            >
              <span>{item[propertyName ? propertyName.value : 'title']}</span>
            </li>
          ))
        ) : (
          <li className="data-error">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>데이터가 없습니다.</span>
          </li>
        )}
      </ul>
    </CustomDropdown>
  );
};

export default Dropdown;
