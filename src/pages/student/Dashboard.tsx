import React, { useEffect, useState } from 'react';
import {
  DashboardContent,
  DashboardLayout,
  DashboardScore,
  DashboardTimetable,
} from '../../styles/DashboardStyle';
import { PulseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { colorData, numberToString, stringToNumber, timeData } from '../../modules/timetable';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import { LectureTimetableData, ObjectType } from '../../types/components';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StudentProfileData } from '../../types/apis';

const Dashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState<ObjectType | null>(null);

  const noticeTableHeader = [
    { title: 'NO.', width: 1 },
    { title: '제목', width: 4 },
    { title: 'DATE', width: 2 },
    { title: '조회수', width: 1 },
  ];

  const timetable = useQuerySearch('/api/student/schedule');

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
        temp[index] = { lectureName: item.lectureName, lectureRoomName: item.lectureRoomName, idx };
      }
    });

    setTime(temp);
  }, [timetable.data]);

  const importantNotice = useQuerySearch('/api/board');
  const importantNoticeList: Array<ObjectType> = importantNotice.data as Array<ObjectType>;
  const notice = useQuerySearch('/api/board/keyword');
  const noticeList: Array<ObjectType> = (notice.data as ObjectType)?.list;

  const totalNoticeList = importantNoticeList &&
    noticeList && [...importantNoticeList, ...noticeList];

  const { user } = useSelector((state: RootState) => state.main);
  const score = useQuerySearch('/api/student/score');
  const scoreData = score?.data as ObjectType;
  const percent = (scoreData?.selfStudyCredit / scoreData?.graduationScore) * 100;

  return (
    <DashboardLayout className="student">
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
                        <div
                          key={index}
                          className="tooltip"
                          style={{ background: colorData[time?.[index]?.idx % 9] }}
                        >
                          <span data-tooltip-text={time?.[index]?.lectureRoomName?.concat('호')}>
                            {time?.[index]?.lectureName}
                          </span>
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
          <span>내 정보</span>
          <button onClick={() => navigate('/student/mypage')}>상세보기</button>
        </div>
        <DashboardScore>
          <div className="percent">
            <CircularProgressbarWithChildren
              value={percent || 0}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: 'var(--title-txt-color)',
                trailColor: 'var(--table-outline-color)',
                strokeLinecap: 'butt',
              })}
            >
              <div style={{ width: '85%' }}>
                <CircularProgressbarWithChildren
                  strokeWidth={50}
                  value={percent || 0}
                  styles={buildStyles({
                    pathColor: 'var(--main-bg-color)',
                    trailColor: 'white',
                    strokeLinecap: 'butt',
                  })}
                >
                  <span className="percent-txt">{!isNaN(percent) ? percent : 0}%</span>
                </CircularProgressbarWithChildren>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className="student-info">
            <div>
              <span>전공</span>
              <span>{user?.profile.majorName}</span>
            </div>
            <div>
              <span>학번</span>
              <span>{(user?.profile as StudentProfileData)?.studentNum}</span>
            </div>
            <div>
              <span>학년</span>
              <span>{(user?.profile as StudentProfileData)?.grade}학년</span>
            </div>
            <div>
              <span>현재 학점</span>
              <span>{scoreData?.selfStudyCredit}</span>
            </div>
            <div>
              <span>졸업 학점</span>
              <span>{scoreData?.graduationScore}</span>
            </div>
          </div>
        </DashboardScore>
      </DashboardContent>
      <DashboardContent>
        <div className="title">
          <span>공지사항</span>
          <button onClick={() => navigate('/student/notice')}>더보기</button>
        </div>
        <div>
          <Table
            header={noticeTableHeader}
            data={totalNoticeList}
            pending={importantNotice.pending || notice.pending}
            error={importantNotice.error || notice.error}
            dashboard={10}
          >
            {totalNoticeList?.map(item => (
              <div key={item.iboard}>
                <div>
                  {item.importance ? <span style={{ fontWeight: '700' }}>중요</span> : item.iboard}
                </div>
                <div onClick={() => navigate(`/student/notice/${item.iboard}`)}>{item.title}</div>
                <div>{item.createdAt.split('T')[0]}</div>
                <div>{item.boardView}</div>
              </div>
            ))}
          </Table>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Dashboard;
