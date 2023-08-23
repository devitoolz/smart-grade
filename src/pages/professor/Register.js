import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ButtonBar from '../../components/ButtonBar';
import Table from '../../components/Table';
import ProfessorRegister from '../../components/ProfessorRegister';

const Register = () => {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <SearchBar></SearchBar>
      <ButtonBar value="개설 신청" onClick={() => setOpenRegister(true)} />
      <Table></Table>
      {openRegister && <ProfessorRegister setOpenRegister={setOpenRegister} />}
    </>
  );
};

export default Register;
