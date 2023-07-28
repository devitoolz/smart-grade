import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { TableArea } from '../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ borderRadius: 5, width: 80, height: 30, background: 'coral' }}>Notice</div>
      <TableArea>
        <table className="notice">
          <thead>
            {/* 
              pink = short
              yellow = middle
              lightgreen = 고정
             */}
            <tr>
              <th>NO</th>
              <th>제목</th>
              <th>DATE</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill()
              .map((item, idx) => (
                <tr key={idx}>
                  <td>1</td>
                  <td>중요한 공지사항</td>
                  <td>2023-07-19</td>
                  <td>
                    <button>수정</button>
                    <button>보기</button>
                    <button>삭제</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableArea>
      <button onClick={() => navigate('/home/notice/write')}>
        글쓰기
        <FontAwesomeIcon icon={faPen} />
      </button>
      <div className="pagination">
        <span>1 2 3 4 5 6 7 8 9 </span>
      </div>
    </div>
  );
};

export default Notice;
