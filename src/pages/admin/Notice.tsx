import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';
import CommonModal from '../../components/CommonModal';
import { deleteBoard } from '../../apis/fetch';
import { ObjectType } from '../../types/components';

const Notice = () => {
  const navigate = useNavigate();

  //검색버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  //input value값
  const [keyword, setKeyword] = useState('');
  //input value change 함수
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  //SearchBar queries
  const queries = { keyword };

  //삭제모달 창 활성화 여부
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  //모달 창 오픈 여부
  const deleteModalOpen = () => {
    setDeleteModalShow(true);
  };
  // 게시클 삭제
  const [boardPk, setBoardPk] = useState<number>(0); // 수정
  const deleteBoardWait = async () => {
    await deleteBoard(boardPk);
    window.location.reload();
  };

  // 공지사항 = 일반공지+중요공지 같이 불러오기
  // 전체 notice Data 담는 list
  const [noticeData, setNoticeData] = useState<Array<any>>([]);
  // 일반
  const url = '/api/board/keyword';
  const { data, pending, error } = useQuerySearch(url, click);
  // 중요공지
  const urlImport = '/api/board';
  const important = useQuerySearch(urlImport, click);

  // 데이터 가공
  useEffect(() => {
    data === null
      ? null
      : important.data === null
      ? null
      : setNoticeData([...(important as ObjectType).data, ...(data as ObjectType).list]); // 수정
  }, [data, important.data]);

  //table header
  const tableHeader = [
    { title: 'NO.', width: 1 },
    { title: '제목', width: 4 },
    { title: 'DATE', width: 2 },
    { title: '관리', width: 3 },
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
        maxPage={(data as ObjectType)?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {noticeData.map(item => {
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
              <div>{item.boardView}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Notice;
