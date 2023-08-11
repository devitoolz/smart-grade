import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import { TextArea } from '../../styles/MyStyleCSS';
import CommonButton from '../../components/CommonButton';
import useQuerySearch from '../../hooks/useSearchFetch';
import Input from '../../components/Input';
import CommonModal from '../../components/CommonModal';
import { putBoard } from '../../api/fetch';

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const boardnum = pathname.split('/');
  const iboard = boardnum[boardnum.length - 1];
  const [click] = useState(false);
  const url = `/api/board/${iboard}`;
  const { data } = useQuerySearch(url, click);
  console.log(data);

  // 게시글 수정
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(data?.title);
  const [ctnt, setCtnt] = useState(data?.ctnt);
  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeCtnt = e => setCtnt(e.target.value);
  const handleEditBoard = () => {
    setEdit(true);
    setTitle(data.title);
    setCtnt(data.ctnt);
  };
  // 모달창 오픈
  const [display, setDisplay] = useState(false);
  const putBoardWait = async () => {
    setDisplay(false);
    const importance = document.getElementById('check').checked ? 1 : 0;
    await putBoard(iboard, ctnt, title, importance);
    alert('처리되었습니다');
    navigate('/admin/home/notice');
  };

  // JSX
  return (
    <div>
      <Ltable>
        <colgroup>
          <col className="title" width={'30%'} />
          <col className="detail" width={'70%'} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <h3>제목</h3>
            </th>
            <th className="inputTitle">
              {!edit ? (
                <p style={{ textAlign: 'left', fontSize: '18px', lineHeight: '35px' }}>
                  {data?.title}
                </p>
              ) : (
                <Input
                  length="full"
                  maxLength={20}
                  value={title}
                  reset={setTitle}
                  setValue={handleChangeTitle}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="statusTitle">
              <h3>작성일자</h3>
            </td>
            <td className="importanceCheck">
              <span>{data?.createdAt.split('T')[0]}</span>
            </td>
          </tr>
          <tr>
            <td className="statusTitle">
              <h3>상태</h3>
            </td>
            <td className="importanceCheck">
              {edit && (
                <>
                  <input type="checkbox" id="check" defaultChecked={data?.importance} />
                  <label htmlFor="check">중요공지사항으로 올리기</label>
                </>
              )}
              {edit ||
                (data?.importance ? (
                  <label htmlFor="check" style={{ color: 'red', fontWeight: 700 }}>
                    중요공지
                  </label>
                ) : (
                  <label htmlFor="check">일반 게시글</label>
                ))}
            </td>
          </tr>
          <tr>
            <td className="contentTitle">
              <h3>내용</h3>
            </td>
            <td className="controlTextarea">
              {!edit ? (
                <div
                  style={{
                    padding: '10px 16px',
                    height: 500,
                    border: '1px solid #cacaca',
                    fontSize: 16,
                    overflowY: 'auto',
                  }}
                >
                  {data?.ctnt}
                </div>
              ) : (
                <TextArea length="full" maxLength={100} value={ctnt} onChange={handleChangeCtnt} />
              )}
            </td>
          </tr>
        </tbody>
      </Ltable>
      <Wbtns>
        {!edit ? (
          <>
            <CommonButton value="수정하기" btnType="page" onClick={() => handleEditBoard()} />
            <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />
          </>
        ) : (
          <>
            <CommonButton
              value="수정완료"
              btnType="page"
              color="blue"
              textColor="white"
              onClick={() => setDisplay(true)}
            />
            <CommonButton
              value="취소하기"
              btnType="page"
              color="red"
              textColor="white"
              onClick={() => setEdit(false)}
            />
          </>
        )}
      </Wbtns>
      {display && (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="게시글 수정"
          handleModalOk={() => putBoardWait()}
          handleModalCancel={() => setDisplay(false)}
        >
          게시글 수정을 완료하시겠습니까?
        </CommonModal>
      )}
    </div>
  );
};

export default NoticeDetail;
