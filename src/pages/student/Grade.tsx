import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import CommonModal from '../../components/CommonModal';
import { getLectureList, putObjection } from '../../apis/studentGrade';
import { dayData } from '../../modules/timetable';
import { SearchBarLayout } from '../../styles/SearchBarStyle';

const Grade = () => {
  const tableHeader = [
    { title: '학년/년도', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1 },
    { title: '강의시간', width: 1.5 },
    // 점수
    { title: '학점', width: 1 },
    { title: '최종성적', width: 1 },
    { title: '평점', width: 1 },
    { title: '등급', width: 1 },
    { title: '이의신청', width: 1.5 },
  ];

  // 강의 pk
  const [ilectureStudent, setIlectureStudent] = useState<number | null>(null);
  // 이의신청 모달창
  const [demur, setDemur] = useState(false);
  const handleApplyDemurOk = async () => {
    putObjectionWait();
    setDemur(false);
  };
  const handleApplyDemurCancel = () => {
    setDemur(false);
    setIlectureStudent(null);
  };

  // 데이터
  const [data, setData] = useState([]);
  const getLectureListWait = async () => {
    await getLectureList(setData);
  };
  useEffect(() => {
    getLectureListWait();
  }, []);
  const putObjectionWait = async () => {
    const objectionUrl = `/api/student/objection?&ilectureStudent=${ilectureStudent}`;
    await putObjection(objectionUrl, setData);
  };

  return (
    <>
      <SearchBarLayout>
        <div style={{ lineHeight: '35px' }}>학생 개인의 성적 조회</div>
      </SearchBarLayout>

      <CommonButton
        btnType="page"
        value="엑셀 다운로드"
        onClick={() => {
          alert('학생 성적 엑셀파일 다운로드(예정)');
        }}
      />

      <Table header={tableHeader} hasPage={true} data={data} pending={false} error={false}>
        {data?.map((item: any, idx) => {
          return (
            <div key={idx}>
              <div>{item.year}</div>
              <div>2</div>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>
                {item.lectureStrTime.substr(0, 5)}~{item.lectureEndTime.substr(0, 5)} (
                {dayData[item.dayWeek].charAt(0)})
              </div>
              <div>{item.score}</div>
              <div>{item.finishedYn === 0 ? '-' : item.totalScore}</div>
              <div>{item.finishedYn === 0 ? '-' : item.grade}</div>
              <div>{item.finishedYn === 0 ? '-' : item.rating}</div>
              <div>
                {item.objection === 0 ? (
                  <CommonButton
                    value="이의신청"
                    btnType="table"
                    color="blue"
                    onClick={() => {
                      setIlectureStudent(item.ilectureStudent);
                      setDemur(true);
                    }}
                  />
                ) : (
                  <>
                    <CommonButton
                      value={item.objection === 1 ? '진행중' : '처리완료'}
                      btnType="table"
                      color="gray"
                      disabled={true}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </Table>
      {demur && (
        <CommonModal
          setDisplay={setDemur}
          modalSize="small"
          modalTitle="이의신청"
          handleModalOk={handleApplyDemurOk}
          handleModalCancel={handleApplyDemurCancel}
        >
          이의신청을 하겠습니까?
        </CommonModal>
      )}
    </>
  );
};

export default Grade;
