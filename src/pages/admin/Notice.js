import React, { useEffect, useState } from 'react';
import { BtnControl } from '../../styles/LectureRoomCss';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import axios from 'axios';
import useQuerySearch from '../../hooks/useSearchFetch';

const Notice = () => {
  ////SearchBar////
  //SearchBar queries
  const queries = {};
  //검색버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  ////Input창////
  //input value값
  const [noticeTitle, setNoticeTitle] = useState('');
  //input value change 함수
  const handleChangeValue = e => {
    setNoticeTitle(e.target.value);
  };

  //notice Data 담는 list
  const [noticeData, setNoticeData] = useState([]);

  //api test
  const getNoticeList = async () => {
    try {
      const res = await axios.get('/api/board');
      const result = res.data;
      console.log('결과를 보여줘라.', result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  //api hook test
  const url = `api/board`;
  const { data, pending } = useQuerySearch(url, click);
  console.log(data?.list);

  //notice test list
  // const getNoticeListLoad = async () => {
  //   try {
  //     const res = await getNoticeList();
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getNoticeList();
  }, []);

  ////Table////
  //table header
  const tableHeader = [
    { title: 'NO.', width: '1' },
    { title: '제목', width: '4' },
    { title: 'DATE', width: '2' },
    { title: '조회수', width: '1' },
    { title: '관리', width: '3' },
  ];

  // const data = [
  //   { iboard: 1, _title: '서문, 북문 포교행위자 주의 바랍니다.', createdAt: '0000-00-00', gg: 1 },
  //   { iboard: 1, _title: '서문, 북문 포교행위자 주의 바랍니다.', createdAt: '0000-00-00', gg: 1 },
  // ];
  const navigate = useNavigate();

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Input
          length="long"
          type="text"
          placeholder="제목"
          value={noticeTitle}
          setValue={handleChangeValue}
          reset={setNoticeTitle}
          maxLength={20}
        />
      </SearchBar>

      <CommonButton
        btnType="page"
        value="글쓰기"
        onClick={() => {
          navigate('/admin/home/notice/write');
        }}
      />
      <Table header={tableHeader} data={data?.list} hasPage={true} maxPage={5} pending={pending}>
        {data.list?.map(item => {
          return (
            <div key={item.iboard}>
              <div>{item.iboard}</div>
              <div>{item.title}</div>
              <div>{item.createdAt}</div>
              <div>{item.boardView}</div>
              <div>
                <CommonButton />
                <CommonButton />
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Notice;
