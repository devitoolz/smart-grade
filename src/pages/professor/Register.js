import React from 'react';
import SearchBar from '../../components/SearchBar';
import ButtonBar from '../../components/ButtonBar';
import Table from '../../components/Table';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <SearchBar></SearchBar> */}
      <ButtonBar value="개설 신청" onClick={() => navigate('apply')} />
      {/* <Table></Table> */}
    </>
  );
};

export default Register;
