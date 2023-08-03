import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { TableArea } from '../../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';
import CommonButton from '../../components/CommonButton';

const Notice = () => {
  ////Table////
  //table header
  const tableHeader = [
    { title: 'NO.', width: '1' },
    { title: '제목', width: '4' },
    { title: 'DATE', width: '2' },
    { title: '관리', width: '3' },
  ];
  const [pending, setPending] = useState(false);
  const data = [
    { iboard: 1, title: '서문, 북문 포교행위자 주의 바랍니다.', createdAt: '0000-00-00', gg: 1 },
  ];
  const navigate = useNavigate();
  // const navigate = useNavigate();
  return (
    <Layout>
      <Table header={tableHeader} data={data} hasPage={true} maxPage={5} pending={pending}>
        {data.map(item => {
          return (
            <div key={item.iboard}>
              <div>{item.iboard}</div>
              <div>{item.title}</div>
              <div>{item.createdAt}</div>
              <div>{item.gg}</div>
            </div>
          );
        })}
      </Table>
      <CommonButton
        btnType="page"
        value="글쓰기"
        onClick={() => {
          navigate('/admin/home/notice/write');
        }}
      >
        <faPen />
      </CommonButton>
    </Layout>
  );
};

export default Notice;
