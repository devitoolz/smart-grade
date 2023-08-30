import React, { useEffect, useState, useRef } from 'react';
import { CustomDropdown } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCircleXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { DropdownProps, ObjectType } from '../types/components';

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
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | number>('');

  const [result, setResult] = useState<Array<ObjectType>>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  const handleMenuOpen = () => {
    itemRef.current?.scrollIntoView({ block: 'start' });
    setIsOpen(!isOpen);
    if (!isOpen) {
      setResult(data || []);
    }
    isOpen ? inputRef.current?.blur() : inputRef.current?.focus();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node)) {
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
        data?.find((item: ObjectType) => item[propertyName ? propertyName.key : 'id'] === value)?.[
          propertyName ? propertyName.value : 'title'
        ]
      );
    if (value === '') {
      setSearchValue('');
    }
  }, [value]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setResult(data || []), 200);
      if (
        data?.length !== 0 &&
        data?.filter(
          (item: ObjectType) => item[propertyName ? propertyName.value : 'title'] === searchValue
        ).length === 0
      ) {
        setSearchValue('');
      }
    }
  }, [isOpen]);

  const handleItemClick = (item: ObjectType) => {
    setValue && setValue(item[propertyName ? propertyName.key : 'id']);
    setSearchValue(item[propertyName ? propertyName.value : 'title']);
    handleMenuOpen();
  };

  const handleResetClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setResult(data || []);
    setValue && setValue('');
    setSearchValue('');
    setIsOpen(false);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const find: ObjectType = data?.find(
      (item: ObjectType) => item[propertyName ? propertyName.value : 'title'] === e.target.value
    );
    find
      ? setValue && setValue(find[propertyName ? propertyName.key : 'id'])
      : setValue && setValue('');
    setResult(
      data?.filter((item: ObjectType) =>
        item[propertyName ? propertyName.value : 'title'].includes(e.target.value)
      ) || []
    );
    itemRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <CustomDropdown ref={menuRef} open={isOpen} isForm={isForm} length={length} value={searchValue}>
      <div onClick={disabled ? undefined : handleMenuOpen}>
        {!disabled && search ? (
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        ) : (
          <span className={value ? undefined : 'placeholder'}>
            {value
              ? data?.find(item => item[propertyName ? propertyName.key : 'id'] === value)?.[
                  propertyName ? propertyName.value : 'title'
                ]
              : placeholder}
          </span>
        )}
        {!disabled && <FontAwesomeIcon icon={faChevronDown} rotation={isOpen ? 180 : undefined} />}
        {!disabled && reset && (
          <FontAwesomeIcon className="reset" icon={faCircleXmark} onClick={handleResetClick} />
        )}
      </div>
      <ul>
        {result.length !== 0 ? (
          result.map((item, index) => (
            <li
              ref={
                item[propertyName ? propertyName.value : 'title'] === searchValue
                  ? itemRef
                  : undefined
              }
              className={
                item[propertyName ? propertyName.value : 'title'] === searchValue
                  ? 'active'
                  : undefined
              }
              key={index}
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
