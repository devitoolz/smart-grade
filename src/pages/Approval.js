import { TableArea } from '../styles/MyStyleCSS';

const Approval = () => {
  const handleRejectLecture = () => {
    console.log('Reject');
  };
  const handleAcceptLecture = () => {
    console.log('Accept');
  };

  // JSX
  return (
    <div>
      <p
        style={{
          borderBottom: '1px solid black',
          color: 'blue',
          fontSize: 30,
          padding: '15px 30px',
        }}
      >
        강의승인
      </p>
      <TableArea>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>강의명</th>
              <th>전공</th>
              <th>학점</th>
              <th>담당교수</th>
              <th>강의 시간</th>
              <th>강의실</th>
              <th>정원</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map(() => (
                <tr key={0}>
                  <td>001</td>
                  <td>강의명이 들어갈 장소</td>
                  <td>전공이름</td>
                  <td>2</td>
                  <td>담당교수</td>
                  <td>14:00~16:00</td>
                  <td>5호관 202호</td>
                  <td>30</td>
                  <td>
                    <div>
                      <button onClick={handleRejectLecture} style={{ background: 'skyblue' }}>
                        승인
                      </button>
                      <button onClick={handleAcceptLecture} style={{ background: 'coral' }}>
                        거절
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableArea>
      <div className="pagination" style={{ background: 'pink' }}>
        <span>1 2 3 4 5 6 7 8 9 </span>
      </div>
    </div>
  );
};
export default Approval;
