import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ButtonBar from '../../components/ButtonBar';
import Table from '../../components/Table';
import ProfessorRegister from '../../components/professor/ProfessorRegister';
import styled from '@emotion/styled';

const Button = styled.button`
  border: none;
  background: white;
  width: 100%;
  height: 100%;
  &:active {
    background: lightgray;
  }
  &:disabled {
    background: gray;
  }
  &.selected {
    background: lightblue;
  }
  &.otherday {
    background: pink;
  }
`;

const Register = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef([]);

  const data = [5, 10, 15, 20, 3, 8, 13, 18];

  useEffect(() => {
    const disableButton = index => {
      if (
        (selected.length === 3 && !selected.includes(index)) ||
        data.includes(index) ||
        (selected.length !== 0 && selected[0] % 5 !== index % 5)
      ) {
        return true;
      }

      return false;
    };

    ref.current.forEach((button, index) => {
      button.disabled = disableButton(index);
    });
  }, [selected]);

  const handleClick = index => {
    if (
      selected.includes(index) ||
      !selected[0] ||
      [selected[0] + 5, selected[0] - 5, selected[1] + 5, selected[1] - 5].includes(index)
    ) {
      if (selected.includes(index)) {
        setSelected(selected.filter(item => item !== index).sort((a, b) => a - b));
      } else {
        setSelected([...selected, index].sort((a, b) => a - b));
      }
      ref.current[index].classList.toggle('selected');
    } else {
      alert('연속된 시간이어야 합니다.');
    }
  };

  return (
    <>
      {/* <SearchBar></SearchBar> */}
      <ButtonBar value="개설 신청" onClick={() => setOpenRegister(true)} />
      <button onClick={() => alert(selected)}>신청 시간</button>
      <div
        style={{
          background: 'skyblue',
          height: '100%',
          display: 'grid',
          gridTemplate: 'repeat(8, 1fr) / repeat(5, 1fr)',
          placeItems: 'center',
        }}
      >
        {Array(40)
          .fill('')
          .map((_, index) => {
            return (
              <Button
                ref={el => (ref.current[index] = el)}
                key={index}
                onClick={() => handleClick(index)}
              >
                {index}
              </Button>
            );
          })}
      </div>
      {/* <Table></Table> */}
      {openRegister && <ProfessorRegister setOpenRegister={setOpenRegister} />}
    </>
  );
};

export default Register;
