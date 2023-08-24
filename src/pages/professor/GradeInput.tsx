import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import CommonButton from '../../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import Input from '../../components/Input';
import { SearchBarLayout } from '../../styles/SearchBarStyle';

const GradeInput = () => {
  const navigate = useNavigate();
  // Request URL
  // /api/professor/grade?ilecture=0&ilectureStudent=0
  // Request body
  /*
    {
      "attendance": 0,
      "midtermExamination": 0,
      "finalExamination": 0
    }
  */

  // table
  const tableHeader = [
    { title: '학번', width: 2 },
    { title: '전공', width: 2 },
    { title: '이름', width: 2 },
    { title: '출석', width: 2 },
    { title: '중간', width: 2 },
    { title: '기말', width: 2 },
    { title: '입력', width: 1 },
  ];
  const tableData = Array(7).fill('');

  // 성적입력 input 창 출력
  const [studentId, setStudentId] = useState<number | null>(null);
  const [attendance, setAttendance] = useState('');
  const [middleEx, setMiddleEx] = useState('');
  const [finalEx, setFinalEx] = useState('');
  const putStudentGradeWait = async (_studentId: number) => {
    // await putStudentGrade();
    console.log(_studentId);
    console.log('출석 = ', attendance);
    console.log('중간 = ', middleEx);
    console.log('기말 = ', finalEx);
    setStudentId(null);
    alert('성적 입력이 완료되었습니다!');
  };
  const handleResetInput = () => {
    setAttendance('');
    setMiddleEx('');
    setFinalEx('');
  };

  return (
    <>
      <SearchBarLayout>
        <div style={{ height: 35 }}>해당 과목 성적입력</div>
      </SearchBarLayout>

      <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />

      <Table header={tableHeader} hasPage={true} data={tableData} pending={false} error={false}>
        {tableData.map((_, idx) => {
          return (
            <div key={idx}>
              <div>학번</div>
              <div>전공</div>
              <div>이름{idx + 1}</div>
              <div>
                {studentId === idx ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="출석"
                    value={attendance}
                    setValue={e => setAttendance(e.target.value)}
                    reset={setAttendance}
                  />
                ) : (
                  '출석'
                )}
              </div>
              <div>
                {studentId === idx ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="중간"
                    value={middleEx}
                    setValue={e => setMiddleEx(e.target.value)}
                    reset={setMiddleEx}
                  />
                ) : (
                  '중간'
                )}
              </div>
              <div>
                {studentId === idx ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="기말"
                    value={finalEx}
                    setValue={e => setFinalEx(e.target.value)}
                    reset={setFinalEx}
                  />
                ) : (
                  '기말'
                )}
              </div>
              <div>
                {studentId === idx ? (
                  <>
                    <CommonButton
                      color="blue"
                      btnType="table"
                      value="완료"
                      onClick={() => {
                        handleResetInput();
                        setStudentId(idx);
                        putStudentGradeWait(studentId);
                      }}
                    />
                    <CommonButton
                      color="red"
                      btnType="table"
                      value="취소"
                      onClick={() => {
                        handleResetInput();
                        setStudentId(null);
                      }}
                    />
                  </>
                ) : (
                  <CommonButton
                    color="gray"
                    btnType="table"
                    value="입력"
                    onClick={() => {
                      handleResetInput();
                      setStudentId(idx);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default GradeInput;
