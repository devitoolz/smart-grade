import React from 'react';
import { TableArea } from '../styles/MyStyleCSS';

const Notice = () => {
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
                    <button>수정</button>
                    <button>수정</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableArea>
      <button>글쓰기</button>
      <div className="pagination">
        <span>1 2 3 4 5 6 7 8 9 </span>
      </div>
    </div>
  );
};

export default Notice;
