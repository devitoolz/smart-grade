import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import GradeDemur from '../../components/professor/GradeDemur';
import { SearchBarLayout } from '../../styles/SearchBarStyle';
import { getLectureList } from '../../apis/professorGrade';
import { dayData } from '../../modules/timetable';
import { NoDatas } from '../../styles/MyStyleCSS';

const Grade = () => {
  const navigate = useNavigate();
  const tableHeader = [
    { title: '연도', width: 1 },
    { title: '학기', width: 1 },
    { title: '학년', width: 1 },
    { title: '강의명', width: 2.5 },
    { title: '강의시간', width: 1.5 },
    { title: '강의실', width: 1.2 },
    { title: '학점', width: 1 },
    { title: '인원', width: 1 },
    { title: '비고', width: 2 },
  ];
  const [data, setData] = useState([]);
  const getLectureListWait = async () => {
    const result = await getLectureList();
    setData(result.lectureList);
  };
  useEffect(() => {
    getLectureListWait();
  }, []);

  // 이의신청 모달
  const [demur, setDemur] = useState<boolean>(false);
  const [lectureId, setLectureId] = useState<number | null>(null);

  return (
    <>
      <SearchBarLayout>
        <div style={{ height: 35, lineHeight: '35px' }}>교수가 현재 수업 중인 강의리스트</div>
      </SearchBarLayout>
      <NoDatas />
      <Table header={tableHeader} data={data} hasPage={true} pending={false} error={false}>
        {data?.map((item: any, idx) => {
          return (
            <div key={idx}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.lectureName}</div>
              <div>
                {item.lectureStrTime}~{item.lectureEndTime} ({dayData[item.dayWeek].charAt(0)})
              </div>
              <div>
                {item.buildingName} {item.lectureRoomName}호
              </div>
              <div>{item.score}</div>
              <div>
                {item.studentCount}/{item.lectureMaxPeople}
              </div>
              <div>
                <CommonButton
                  value="이의확인"
                  btnType="table"
                  color="gray"
                  onClick={() => {
                    setDemur(true);
                    setLectureId(item.ilecture);
                  }}
                />
                <CommonButton
                  value="성적입력"
                  btnType="table"
                  color="blue"
                  onClick={() => {
                    navigate(`/professor/grade/input/${item.ilecture}`);
                  }}
                />
              </div>
            </div>
          );
        })}
      </Table>
      {demur && <GradeDemur setDemur={setDemur} lectureId={lectureId} />}
    </>
  );
};

export default Grade;
