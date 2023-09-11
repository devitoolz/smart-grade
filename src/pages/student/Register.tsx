import React, { useState } from 'react';
import useQuerySearch from '../../hooks/useSearchFetch';
import { ObjectType } from '../../types/components';
import RegisterDetail from '../../components/RegisterDetail';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import { dayData } from '../../modules/timetable';

const Register = () => {
  const [lectureName, setLectureName] = useState<string>('');
  const [lectureData, setLectureData] = useState<ObjectType | null>(null);

  const [click, setClick] = useState<boolean>(false);

  const tableHeader = [
    { title: '강의명', width: 5 },
    { title: '담당 교수', width: 2 },
    { title: '강의실', width: 2 },
    { title: '강의 시간', width: 2.5 },
    { title: '학점', width: 1 },
    { title: '정원', width: 1 },
    { title: '상세보기', width: 1.5 },
    { title: '수강 신청', width: 1.5 },
  ];

  const LectureName = lectureName;

  const queries = { LectureName };
  const url = '/api/student/lecturelist';

  const { data, pending, error } = useQuerySearch(url, click);

  const lectureList: Array<ObjectType> = (data as ObjectType)?.lectureList;

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Input
          length="long"
          type="text"
          placeholder="강의명"
          reset={setLectureName}
          value={lectureName}
          setValue={e => setLectureName(e.target.value)}
        />
      </SearchBar>
      <div style={{ height: 95 }} />
      <Table
        header={tableHeader}
        data={lectureList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page.maxPage}
        pending={pending}
        error={error}
      >
        {lectureList?.map(item => {
          return (
            <div key={item.ilecture}>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>{`${item.buildingName} ${item.lectureRoomName}호`}</div>
              <div>{`${dayData[item.dayWeek]} ${item.lectureStrTime.slice(
                0,
                -3
              )} ~ ${item.lectureEndTime.slice(0, -3)}`}</div>
              <div>{item.score}</div>
              <div>{item.lectureMaxPeople}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => setLectureData(item)}
                ></CommonButton>
              </div>
              <div>
                <CommonButton
                  value="수강 신청"
                  btnType="table"
                  color="blue"
                  onClick={() => alert('dd')}
                />
              </div>
            </div>
          );
        })}
      </Table>
      {lectureData && <RegisterDetail lectureData={lectureData} setLectureData={setLectureData} />}
    </>
  );
};

export default Register;
