import React, { useEffect, useState, useRef } from 'react';
import { CustomDropdown } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ length, placeholder, data, value, setValue, reset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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

  const handleItemClick = item => {
    setValue && setValue(item.title);
    setIsOpen(false);
  };

  const handleResetClick = e => {
    e.stopPropagation();
    setIsOpen(false);
    setValue('');
  };

  return (
    <CustomDropdown ref={menuRef} open={isOpen} length={length} value={value}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <span className={value ? null : 'placeholder'}>{value ? value : placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} rotation={isOpen ? 180 : 0} />
        {reset && (
          <FontAwesomeIcon className="reset" icon={faCircleXmark} onClick={handleResetClick} />
        )}
      </div>
      <ul>
        {data.length !== 0 ? (
          data.map(item => (
            <li
              className={item.title === value ? 'active' : null}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <span>{item.title}</span>
            </li>
          ))
        ) : (
          <li>NO DATA</li>
        )}
      </ul>
    </CustomDropdown>
  );
};

export default Dropdown;
