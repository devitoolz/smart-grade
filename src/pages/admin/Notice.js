import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { TableArea } from '../../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';

const Notice = () => {
  const tableHeader = [];
  const navigate = useNavigate();
  return (
    <Layout>
      <Table></Table>
    </Layout>
  );
};

export default Notice;
