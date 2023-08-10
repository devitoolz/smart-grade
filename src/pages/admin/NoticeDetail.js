import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import CommonButton from '../../components/CommonButton';
import useQuerySearch from '../../hooks/useSearchFetch';

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useSearchParams();
  const boardnum = pathname.split('/');
  const iboard = boardnum[boardnum.length - 1];
  const [click, setClick] = useState(false);
  const url = `/api/board/${iboard}`;
  const { data } = useQuerySearch(url, click);
  console.log(data);

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
            <p style={{ textAlign: 'left', fontSize: 18 }}>{data?.title}</p>
          </th>
        </thead>
        <tbody>
          <tr>
            <td className="statusTitle">
              <h3>상태</h3>
            </td>
            <td className="importanceCheck">
              <input type="checkbox" id="check" checked={data?.importance} />

              {data?.importance ? (
                <p style={{ color: 'red', fontWeight: 700 }}>중요공지</p>
              ) : (
                <p>일반 게시글</p>
              )}
            </td>
          </tr>
          <tr>
            <td className="contentTitle">
              <h3>내용</h3>
            </td>
            <td className="controlTextarea">
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
            </td>
          </tr>
        </tbody>
      </Ltable>
      <Wbtns>
        <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />
      </Wbtns>
    </div>
  );
};
export default NoticeDetail;
