import { useState, useEffect } from 'react';
import CommonButton from '../../components/CommonButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Table from '../../components/Table';
import Input from '../../components/Input';
import { SearchBarLayout } from '../../styles/SearchBarStyle';
import { ObjectType } from '../../types/components';
import api from '../../apis/api';
import { putStudentGrade } from '../../apis/professorGrade';
import useQuerySearch from '../../hooks/useSearchFetch';

const GradeInput = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ilecture = pathname.split('/').at(-1);
  const [query, setQuery] = useSearchParams();
  const getPageIdx = query.get('page');
  const pageIdx = getPageIdx ? getPageIdx : 1;
  useEffect(() => {
    query.set('ilecture', ilecture as string);
    setQuery(query);
  }, []);

  // table
  const tableHeader = [
    { title: '학번', width: 1 },
    { title: '전공', width: 2 },
    { title: '이름', width: 1 },
    { title: '출석', width: 1 },
    { title: '중간', width: 1 },
    { title: '기말', width: 1 },
    { title: '입력', width: 1.2 },
  ];
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [maxPage, setMaxPage] = useState();
  const url = '/api/professor/grade';
  const { data, pending, error } = useQuerySearch(url);
  useEffect(() => {
    setTableData((data as ObjectType)?.lecturelist);
    setMaxPage((data as ObjectType)?.page?.maxPage);
  }, [data]);

  // 성적입력
  const [studentId, setStudentId] = useState<number | null>(null);
  const [attendance, setAttendance] = useState('');
  const [middleEx, setMiddleEx] = useState('');
  const [finalEx, setFinalEx] = useState('');
  const putStudentGradeWait = async (ilectureStudent: number) => {
    const attendancePoint = Number(attendance);
    const middleExPoint = Number(middleEx);
    const finalExPoint = Number(finalEx);
    if (attendancePoint + middleExPoint + finalExPoint === 0) {
      alert('성적을 입력해주세요');
    } else {
      const result = await putStudentGrade(
        ilectureStudent,
        Number(ilecture),
        attendancePoint,
        middleExPoint,
        finalExPoint
      );
      if (result) {
        setStudentId(null);
        const url = `/api/professor/grade?ilecture=${ilecture}&page=${Number(pageIdx) - 1}`;
        const { data } = await api.get(url);
        setTableData(data?.lecturelist);
      }
    }
  };
  const handleResetInput = () => {
    setAttendance('');
    setMiddleEx('');
    setFinalEx('');
  };

  return (
    <>
      <SearchBarLayout>
        <div style={{ height: 35, lineHeight: '35px' }}>해당 과목 성적입력</div>
      </SearchBarLayout>

      <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(`/professor/grade`)} />

      <Table
        header={tableHeader}
        pending={pending}
        error={error}
        hasPage={true}
        data={tableData}
        maxPage={1}
      >
        {tableData?.map((item: any) => {
          return (
            <div key={item.ilectureStudent}>
              <div>{item.studentNum}</div>
              <div>{item.majorName}</div>
              <div>{item.studentName}</div>
              <div>
                {studentId === item.ilectureStudent ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="출석"
                    value={attendance}
                    setValue={e => setAttendance(e.target.value)}
                    reset={setAttendance}
                  />
                ) : (
                  <>{item.finishedYn ? item.attendance : '-'}</>
                )}
              </div>
              <div>
                {studentId === item.ilectureStudent ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="중간"
                    value={middleEx}
                    setValue={e => setMiddleEx(e.target.value)}
                    reset={setMiddleEx}
                  />
                ) : (
                  <>{item.finishedYn ? item.midtermExamination : '-'}</>
                )}
              </div>
              <div>
                {studentId === item.ilectureStudent ? (
                  <Input
                    length="short"
                    type="text"
                    placeholder="기말"
                    value={finalEx}
                    setValue={e => setFinalEx(e.target.value)}
                    reset={setFinalEx}
                  />
                ) : (
                  <>{item.finishedYn ? item.finalExamination : '-'}</>
                )}
              </div>
              <div>
                {studentId === item.ilectureStudent ? (
                  <>
                    <CommonButton
                      color="blue"
                      btnType="table"
                      value="완료"
                      onClick={() => {
                        handleResetInput();
                        setStudentId(item.ilectureStudent);
                        putStudentGradeWait(item.ilectureStudent);
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
                      setStudentId(item.ilectureStudent);
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
