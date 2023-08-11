import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import { TextArea } from '../../styles/MyStyleCSS';
import CommonButton from '../../components/CommonButton';
import useQuerySearch from '../../hooks/useSearchFetch';
import Input from '../../components/Input';

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
  // JSX
  return (
    <div>
      <Ltable>
        <colgroup>
          <col className="title" width={'30%'} />
          <col className="detail" width={'70%'} />
        </colgroup>
        <thead>
          <th>
            <h3>제목</h3>
          </th>
          <th className="inputTitle">
            {!edit ? (
              <p style={{ textAlign: 'left', fontSize: 18 }}>{data?.title}</p>
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
        </thead>
        <tbody>
          <tr>
            <td className="statusTitle">
              <h3>상태</h3>
            </td>
            <td className="importanceCheck">
              <input type="checkbox" id="check" disabled checked={data?.importance} />
              {data?.importance ? (
                <label style={{ color: 'red', fontWeight: 700 }}>중요공지</label>
              ) : (
                <label>일반 게시글</label>
              )}
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
          <CommonButton value="수정하기" btnType="page" onClick={() => handleEditBoard()} />
        ) : (
          <CommonButton value="취소하기" btnType="page" onClick={() => setEdit(false)} />
        )}
        <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />
      </Wbtns>
    </div>
  );
};
export default NoticeDetail;
