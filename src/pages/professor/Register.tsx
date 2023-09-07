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

const Register = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string | number | null>(null);
  const [lectureName, setLectureName] = useState<string>('');
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

  const queries = { status, lectureName };
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
          // propertyName={{ key: 'imajor', value: 'majorName' }}
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
      <Table header={tableHeader} data={lectureList} pending={pending} error={error}>
        {lectureList?.map(item => {
          return (
            <div key={item.ilecture}>
              {/* <div>{item.openingProceudres}</div> */}
              <div>개설 대기</div>
              <div>{item.gradeLimit}</div>
              <div>{item.lectureName}</div>
              {/* <div>{item.lectureRoomName}</div> */}
              <div>백매관 501호</div>
              {/* <div>{`${dayData[item.dayWeek]} ${item.lectureStrTime} ~ ${
                item.lectureEndTime
              }`}</div> */}
              <div>수요일 12:00 ~ 13:00</div>
              <div>{item.score}</div>
              <div>{item.lectureMaxPeople}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => alert('클릭')}
                ></CommonButton>
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Register;
