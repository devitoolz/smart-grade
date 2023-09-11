import React from 'react';
import { DashboardContent, DashboardLayout, DashboardTimetable } from '../../styles/DashboardStyle';
import { PulseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { numberToString, timeData } from '../../modules/timetable';

const Dashboard = () => {
  const error = false;
  const pending = false;

  return (
    <DashboardLayout>
      <DashboardContent className="timetable">
        <div className="title">
          <span>강의 시간표</span>
        </div>
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
            {!error ? (
              <div className="timetable-lectures">
                {Array(45)
                  .fill('')
                  .map((_, index) => {
                    return <div key={index}>{index}</div>;
                  })}
                {pending && (
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
      </DashboardContent>
      <DashboardContent></DashboardContent>
      <DashboardContent></DashboardContent>
    </DashboardLayout>
  );
};

export default Dashboard;
