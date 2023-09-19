import React, { useEffect, useState } from 'react';
import useQuerySearch from '../../hooks/useSearchFetch';
import { ObjectType } from '../../types/components';
import RegisterDetail from '../../components/RegisterDetail';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import { dayData } from '../../modules/timetable';
import api from '../../apis/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [lectureName, setLectureName] = useState<string>('');
  const [lectureData, setLectureData] = useState<ObjectType | null>(null);
  const [lectureListResult, setLectureListResult] = useState<Array<ObjectType> | null>(null);

  const [click, setClick] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    if (user && new Date(Date.now()) > new Date(user.deadline)) {
      alert('수강 신청 기간이 아닙니다.');
      navigate(-1);
    }
  }, [user]);

  const tableHeader = [
    { title: '강의명', width: 5 },
    { title: '담당 교수', width: 2 },
    { title: '강의실', width: 2 },
    { title: '강의 시간', width: 2.5 },
    { title: '학점', width: 1 },
    { title: '정원', width: 1.5 },
    { title: '상세보기', width: 1.5 },
    { title: '수강 신청', width: 1.5 },
  ];

  const queries = { lectureName };
  const url = `${process.env.REACT_APP_API_URL}/api/student/lecturelist`;

  const { data, pending, error } = useQuerySearch(url, click);

  const lectureList: Array<ObjectType> = (data as ObjectType)?.lectureList;

  useEffect(() => {
    setLectureListResult(
      lectureList?.map(lecture => {
        lecture.lectureStrTime = lecture.lectureStrTime.slice(0, -3);
        lecture.lectureEndTime = lecture.lectureEndTime.slice(0, -3);
        return lecture;
      })
    );
  }, [lectureList]);

  const handleRegister = async (ilecture: number) => {
    try {
      const { data } = await api.post(`${process.env.REACT_APP_API_URL}/api/student/lecture`, {
        ilecture,
      });
      if (data.success) {
        alert('수강 신청되었습니다.');
        setClick(prev => !prev);
      } else {
        alert(data.message);
      }
    } catch {
      alert('수강 신청에 실패하였습니다.');
    }
  };

  const handleUnregister = async (ilecture: number) => {
    const { data } = await api.delete(
      `${process.env.REACT_APP_API_URL}/api/student/lecture?ilecture=${ilecture}`
    );
    if (data) {
      alert('수강 신청이 취소되었습니다.');
      setClick(prev => !prev);
    } else {
      alert('수강 신청 취소에 실패하였습니다.');
    }
  };

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
        data={lectureListResult ?? lectureList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page.maxPage}
        pending={pending}
        error={error}
      >
        {lectureListResult?.map(item => {
          return (
            <div key={item.ilecture}>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>{`${item.buildingName} ${item.lectureRoomName}호`}</div>
              <div>{`${item.lectureStrTime} ~ ${item.lectureEndTime} ${
                dayData[item.dayWeek]
              }`}</div>
              <div>{item.score}</div>
              <div>{`${item.studentsEnrolled} / ${item.lectureMaxPeople}`}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => setLectureData(item)}
                ></CommonButton>
              </div>
              <div>
                {item.studentsEnrolled === item.lectureMaxPeople ? (
                  <span>신청 불가</span>
                ) : (
                  <CommonButton
                    value={item.applyYn ? '수강 신청' : '수강 취소'}
                    btnType="table"
                    color={item.applyYn ? 'blue' : 'red'}
                    onClick={
                      item.applyYn
                        ? () => handleRegister(item.ilecture)
                        : () => handleUnregister(item.ilecture)
                    }
                  />
                )}
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
