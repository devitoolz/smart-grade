import React, { useEffect, useState } from 'react';
import { DashboardContent, DashboardLayout, DashboardTimetable } from '../../styles/DashboardStyle';
import { PulseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { colorData, numberToString, stringToNumber, timeData } from '../../modules/timetable';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import { LectureTimetableData, ObjectType } from '../../types/components';

const Dashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState<ObjectType | null>(null);

  const tableHeader = [
    { title: 'NO.', width: 1 },
    { title: '제목', width: 4 },
    { title: 'DATE', width: 2 },
    { title: '조회수', width: 1 },
  ];

  const timetable = useQuerySearch('/api/professor/schedule');

  useEffect(() => {
    let temp: ObjectType = {};

    timetable.data?.map((item: LectureTimetableData, idx: number) => {
      const start = stringToNumber(item.startTime);
      const end = stringToNumber(item.endTime);
      const startKey = parseInt(
        Object.keys(timeData).find(key => timeData[parseInt(key)] === start) as string
      );
      for (let i = 0; i < end - start; i++) {
        const index = 5 * startKey + item.dayWeek - 1 + 5 * i;
        temp[index] = { lectureName: item.lectureName, idx };
      }
    });

    setTime(temp);
  }, [timetable.data]);

  console.log(time);

  const importantNotice = useQuerySearch('/api/board');
  const importantNoticeList: Array<ObjectType> = importantNotice.data as Array<ObjectType>;
  const notice = useQuerySearch('/api/board/keyword?size=9');
  const noticeList: Array<ObjectType> = (notice.data as ObjectType)?.list;

  const totalList = importantNotice && noticeList && [...importantNoticeList, ...noticeList];

  return (
    <DashboardLayout>
      <DashboardContent className="timetable">
        <div className="title">
          <span>강의 시간표</span>
        </div>
        <div>
          <DashboardTimetable>
            <div className="timetable-header">
              <div></div>
              <div>월요일</div>
              <div>화요일</div>
              <div>수요일</div>
              <div>목요일</div>
              <div>금요일</div>
            </div>
            <div className="timetable-content">
              <div className="timetable-time">
                {Object.keys(timeData).map((item, index) => {
                  const time = timeData[parseInt(item)];
                  return (
                    <div key={index}>
                      <span>{parseInt(item) + 1}교시</span>
                      <span>{`(${numberToString(time)} ~ ${numberToString(time + 1)})`}</span>
                    </div>
                  );
                })}
              </div>
              {!timetable.error ? (
                <div className="timetable-lectures">
                  {Array(45)
                    .fill('')
                    .map((_, index) => {
                      return (
                        <div key={index} style={{ background: colorData[time?.[index]?.idx % 9] }}>
                          {time?.[index]?.lectureName}
                        </div>
                      );
                    })}
                  {timetable.pending && (
                    <div className="timetable-loading">
                      <PulseLoader color="#47b5ff" margin={6} size={12} speedMultiplier={0.7} />
                      <span>로딩 중...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="timetable-error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  <span>데이터를 불러오지 못했습니다.</span>
                </div>
              )}
            </div>
          </DashboardTimetable>
        </div>
      </DashboardContent>
      <DashboardContent>
        <div className="title">
          <span>공지사항</span>
          <button onClick={() => navigate('/professor/notice')}>더보기</button>
        </div>
        <div>
          <Table
            header={tableHeader}
            data={totalList}
            pending={importantNotice.pending || notice.pending}
            error={importantNotice.error || notice.error}
            dashboard
          >
            {totalList?.map(item => {
              return (
                <div key={item.iboard}>
                  <div>
                    {item.importance ? (
                      <span style={{ fontWeight: '700' }}>중요</span>
                    ) : (
                      item.iboard
                    )}
                  </div>
                  <div onClick={() => navigate(`/professor/notice/${item.iboard}`)}>
                    {item.title}
                  </div>
                  <div>{item.createdAt.split('T')[0]}</div>
                  <div>{item.boardView}</div>
                </div>
              );
            })}
          </Table>
        </div>
      </DashboardContent>
      <DashboardContent>
        <div className="title">이의 신청</div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Dashboard;
