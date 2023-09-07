import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ButtonBar from '../../components/ButtonBar';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import useQuerySearch from '../../hooks/useSearchFetch';
import { ObjectType } from '../../types/components';
import CommonButton from '../../components/CommonButton';
import { dayData } from './RegisterApply';
import RegisterDetail from '../../components/professor/RegisterDetail';

const Register = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string | number | null>(null);
  const [lectureName, setLectureName] = useState<string>('');
  const [lectureData, setLectureData] = useState<ObjectType | null>(null);

  const [click, setClick] = useState<boolean>(false);

  const tableHeader = [
    { title: '상태', width: 1.5 },
    { title: '학년', width: 1 },
    { title: '강의명', width: 5 },
    { title: '강의실', width: 2 },
    { title: '강의 시간', width: 2.5 },
    { title: '학점', width: 1 },
    { title: '정원', width: 1 },
    { title: '상세보기', width: 1.5 },
  ];

  const openingProcedures = status;
  const LectureName = lectureName;

  const queries = { openingProcedures, LectureName };
  const url = '/api/professor/lecture/list';

  const { data, pending, error } = useQuerySearch(url, click);

  const lectureList: Array<ObjectType> = (data as ObjectType)?.lectureList;

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="상태"
          data={[
            { id: 1, title: '개설 대기' },
            { id: 2, title: '개설 승인' },
          ]}
          value={status}
          setValue={setStatus}
          reset
        />
        <Input
          length="long"
          type="text"
          placeholder="강의명"
          reset={setLectureName}
          value={lectureName}
          setValue={e => setLectureName(e.target.value)}
        />
      </SearchBar>
      <ButtonBar value="개설 신청" onClick={() => navigate('apply')} />
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
              <div>
                {(item.openingProcedures === 1 && '개설 대기') ||
                  (item.openingProcedures === 2 && '개설 승인')}
              </div>
              <div>{item.gradeLimit}</div>
              <div>{item.lectureName}</div>
              <div>{`${item.buildingName} ${item.lectureRoomName}호`}</div>
              <div>{`${dayData[item.dayWeek]} ${item.lectureStrTime} ~ ${
                item.lectureEndTime
              }`}</div>
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
            </div>
          );
        })}
      </Table>
      {lectureData && <RegisterDetail lectureData={lectureData} setLectureData={setLectureData} />}
    </>
  );
};

export default Register;
