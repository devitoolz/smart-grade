import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import { dayData } from '../../modules/timetable';

const Students = () => {
  //페이지 이동
  const navigate = useNavigate();
  //페이지 이동 함수
  const pagemove = () => {
    navigate('/professor/students/detail');
  };

  ////searchBar////
  //학년 state
  const [year, setYear] = useState('');
  //전공 state
  const [lectureName, setLectureName] = useState('');

  //쿼리스트링
  const queries = { year, lectureName };

  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //tabel header
  const tableHeader = [
    {
      title: '연도',
      width: '0.5',
    },
    {
      title: '학기 ',
      width: '0.5',
    },
    {
      title: '학년',
      width: '0.5',
    },
    {
      title: '강의명 ',
      width: '1.5',
    },
    {
      title: '학점',
      width: '0.5',
    },
    {
      title: '강의시간 ',
      width: '1',
    },
    {
      title: '강의실',
      width: '1',
    },
    {
      title: '정원 ',
      width: '0.5',
    },
    {
      title: '학생목록',
      width: '1',
    },
  ];

  //연도 리스트 데이터
  const yearDataList = [
    {
      id: '2020',
      title: '2020',
    },
    {
      id: '2021',
      title: '2021',
    },
    {
      id: '2022',
      title: '2022',
    },
    {
      id: '2023',
      title: '2023',
    },
  ];
  //api get hook test
  const url = `/api/professor/lecture-list`;

  const { data, pending, error } = useQuerySearch(url, click);

  //강의명 드랍다운 데이터
  const LectureNameList = [];
  data?.lectureList?.forEach(item => {
    LectureNameList.push({ id: item.lectureName, title: item.lectureName });
  });

  return (
    <div>
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="연도"
            data={yearDataList}
            value={year}
            setValue={setYear}
            reset
            search
          />
          <Dropdown
            length="long"
            placeholder="강의명"
            data={LectureNameList}
            value={lectureName}
            setValue={setLectureName}
            reset
            search
          />
        </SearchBar>
      </div>
      <Table
        header={tableHeader}
        data={data?.lectureList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureList?.map(item => {
          return (
            <div key={item.ilecture}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.lectureName}</div>
              <div>{item.score}</div>
              <div>
                {item.lectureStrTime.substr(0, 5)}~{item.lectureEndTime.substr(0, 5)}
                {''} {''}
                {dayData[item.dayWeek]}
              </div>
              <div>
                {item.buildingName} {''} {''}
                {item.lectureRoomName}호
              </div>
              <div>{item.lectureMaxPeople}</div>
              <div>
                <CommonButton btnType="table" color="gray" value="상세보기" onClick={pagemove} />
              </div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};

export default Students;
