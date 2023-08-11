import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';
import CommonModal from '../../components/CommonModal';
import { deleteBoard } from '../../api/fetch';

const Notice = () => {
  //검색버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  ////Input창////
  //input value값
  // const [noticeTitle, setNoticeTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  //input value change 함수
  const handleChangeValue = e => {
    setKeyword(e.target.value);
  };
  ////SearchBar////
  //SearchBar queries
  const queries = { keyword };

  //삭제모달 창 활성화 여부
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  //모달 창 오픈 여부
  const deleteModalOpen = () => {
    setDeleteModalShow(true);
  };
  // 게시클 삭제
  const [boardPk, setBoardPk] = useState();
  const deleteBoardWait = async () => {
    await deleteBoard(boardPk);
    window.location.reload();
  };

  // 공지사항
  // 일반공지+중요공지 같이 불러오기
  // 전체 notice Data 담는 list
  const [noticeData, setNoticeData] = useState([]);
  const [url, setUrl] = useState('/api/board');
  // custom hook
  // const url = '/api/board';
  const { data, pending, error } = useQuerySearch(url, click);
  console.log(data);
  // 중요공지
  const urlImport = '/api/board/importanceList';
  const important = useQuerySearch(urlImport, click);
  // 데이터 가공
  useEffect(() => {
    data === null
      ? null
      : important.data === null
      ? null
      : setNoticeData([...important.data, ...data.list]);
  }, [data, important.data]);
  //
  const [query, setQuery] = useSearchParams();
  // useEffect(() => {
  //   keyword ? query.set('keyword', keyword) : null;
  //   setQuery(query);
  // }, []);
  useEffect(() => {
    query.get('keyword') ? setUrl('/api/board/search') : setUrl('/api/board');
  }, [url, click, data]);
  // 게시글 검색
  // const [query, setQuery] = useSearchParams();
  // useEffect(() => {
  //   keyword ? query.set('keyword', keyword) : null;
  //   setQuery(query);
  // }, []);
  // useEffect(() => {
  //   query.get('keyword');
  //   setQuery(query);
  // }, []);
  // const searchUrl = '/api/board/search';
  // const searchBoard = useQuerySearch(searchUrl, click);
  // console.log(searchBoard?.data?.list);
  // useEffect(() => {
  //   searchBoard.data.list === [] ? null : setNoticeData([...searchBoard.data.list]);
  // }, [searchBoard.data.list]);

  //notice test list
  // const getNoticeListLoad = async () => {
  //   try {
  //     const res = await getNoticeList();
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getNoticeList();
  // }, []);

  ////Table////
  //table header
  const tableHeader = [
    { title: 'NO.', width: '1' },
    { title: '제목', width: '4' },
    { title: 'DATE', width: '2' },
    { title: '관리', width: '3' },
    { title: '조회수', width: '1' },
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
          value={keyword}
          setValue={handleChangeValue}
          reset={setKeyword}
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
      {deleteModalShow === true ? (
        <CommonModal
          setDisplay={setDeleteModalShow}
          modalSize="small"
          modalTitle="게시글 삭제"
          handleModalOk={() => {
            deleteBoardWait();
            setDeleteModalShow(false);
          }}
          handleModalCancel={() => setDeleteModalShow(false)}
        >
          <p>게시글을 삭제하시겠습니까?</p>
        </CommonModal>
      ) : null}

      <Table
        header={tableHeader}
        data={noticeData}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {noticeData.map(item => {
          return (
            <div key={item.iboard}>
              <div>{item.importance ? `[중요]` : item.iboard}</div>
              <div>{item.title}</div>
              {/* <div>{item.createdAt}</div> */}
              <div>{item.createdAt.split('T')[0]}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="blue"
                  value="수정"
                  onClick={() => navigate(`${item.iboard}`)}
                />
                <CommonButton
                  btnType="table"
                  color="blue"
                  value="보기"
                  onClick={() => navigate(`${item.iboard}`)}
                />
                <CommonButton
                  btnType="table"
                  color="red"
                  value="삭제"
                  onClick={() => {
                    setBoardPk(item.iboard);
                    deleteModalOpen();
                  }}
                />
              </div>
              <div>{item.boardView}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Notice;
