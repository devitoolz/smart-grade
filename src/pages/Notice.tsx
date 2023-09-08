import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import CommonButton from '../components/CommonButton';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';
import useQuerySearch from '../hooks/useSearchFetch';
import CommonModal from '../components/CommonModal';
import { deleteBoard } from '../apis/board';
import { ObjectType } from '../types/components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { NoDatas } from '../styles/MyStyleCSS';

const Notice = () => {
  const navigate = useNavigate();

  // 관리자모드 확인
  const { user } = useSelector((state: RootState) => state.main);

  const [click, setClick] = useState(false);
  const [keyword, setKeyword] = useState('');
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  const queries = { keyword };

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const deleteModalOpen = () => setDeleteModalShow(true);
  // 게시클 삭제
  const [boardPk, setBoardPk] = useState<number>(0); // XXX 수정
  const deleteBoardWait = async () => {
    await deleteBoard(boardPk);
    window.location.reload();
  };

  // 공지사항 = 일반공지+중요공지 같이 불러오기
  const [noticeData, setNoticeData] = useState<Array<any>>([]);
  // 일반
  const url = '/api/board/keyword';
  const { data, pending, error } = useQuerySearch(url, click);
  // 중요공지
  const urlImport = '/api/board';
  const important = useQuerySearch(urlImport, click);

  // 데이터 가공
  const { search } = useLocation();
  // useEffect(() => {
  //   data === null
  //     ? null
  //     : important.data === null
  //     ? null
  //     : setNoticeData([...(important as ObjectType).data, ...(data as ObjectType).list]);
  // }, [data, important.data]);
  useEffect(() => {
    const match = search.search(/\?keyword=([^&]+)/);
    // 일반+중요 공지
    const noticeList = () => {
      data === null
        ? null
        : important.data === null
        ? null
        : setNoticeData([...(important as ObjectType).data, ...(data as ObjectType).list]);
    };
    // 검색결과
    const noticeSearch = () => {
      data !== null ? setNoticeData([...(data as ObjectType).list]) : null;
    };
    match === 0 ? noticeSearch() : noticeList();
  }, [data, important.data]);

  // XXX 수정수정
  const tableHeader = !user
    ? [
        { title: 'NO.', width: 1 },
        { title: '제목', width: 4 },
        { title: 'DATE', width: 2 },
        { title: '관리', width: 3 },
        { title: '조회수', width: 1 },
      ]
    : [
        { title: 'NO.', width: 1 },
        { title: '제목', width: 4 },
        { title: 'DATE', width: 2 },
        { title: '조회수', width: 1 },
      ];

  // JSX
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
          user
            ? alert('글쓰기 기능은 관리자만 사용할 수 있습니다')
            : navigate(`/admin/home/notice/write`);
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
        maxPage={(data as ObjectType)?.page?.maxPage - 1}
        pending={pending}
        error={error}
      >
        {noticeData?.map((item: any) => {
          return (
            <div key={item.iboard}>
              <div>
                {item.importance ? <span style={{ fontWeight: '700' }}>중요</span> : item.iboard}
              </div>
              <div>
                <span style={{ cursor: 'pointer' }} onClick={() => navigate(`${item.iboard}`)}>
                  {item.title}
                </span>
              </div>
              <div>{item.createdAt.split('T')[0]}</div>
              {!user && (
                <div>
                  <CommonButton
                    btnType="table"
                    color="blue"
                    value="수정"
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
              )}
              <div>{item.boardView}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Notice;
