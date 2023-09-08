import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import useQuerySearch from '../../hooks/useSearchFetch';
import CommonButton from '../../components/CommonButton';
import { RootState } from '../../store';
import { ObjectType } from '../../types/components';
import { Button, ButtonBarLayout } from '../../styles/ButtonBarStyle';
import { handleDownloadExcel, handleUploadExcel } from '../../modules/excel';
import ExcelData from '../../components/ExcelData';

const Student = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState<boolean>(false);

  const gradeList = Array(4)
    .fill('')
    .map((_, index) => {
      return { id: index + 1, title: index + 1 + '학년' };
    });

  const [grade, setGrade] = useState<string | number | null>(null);
  const [imajor, setImajor] = useState<string | number | null>(null);
  const [studentNum, setStudentNum] = useState<string>('');
  const [nm, setNm] = useState<string>('');

  const [excelData, setExcelData] = useState<Array<ObjectType> | null>(null);
  const [excelDataHasError, setExcelDataHasError] = useState<boolean>(false);

  const { allMajorList } = useSelector((state: RootState) => state.major);

  const tableHeader = [
    { title: '학번', width: 2 },
    { title: '학년', width: 1 },
    { title: '전공', width: 5 },
    { title: '이름', width: 2 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 2.5 },
    { title: '전화번호', width: 3 },
    { title: '입학년도', width: 2 },
    { title: '졸업여부', width: 2 },
    { title: '이수학점', width: 2 },
    { title: '상세보기', width: 2 },
  ];

  const queries = { grade, imajor, studentNum, nm };
  const url = '/api/admin/students';

  const { data, pending, error } = useQuerySearch(url, click);

  const studentsList: Array<ObjectType> = (data as ObjectType)?.students;

  const headerWidths = [12, 6, 22, 30, 26];
  const excelDataHeader = [
    { title: '이름', width: 2 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 2.5 },
    { title: '전공', width: 5 },
    { title: '휴대전화', width: 3 },
  ];
  const viewData = ['nm', 'gender', 'birthdate', 'majorName', 'phone'];
  const postData = ['nm', 'gender', 'birthdate', 'imajor', 'phone'];

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={gradeList}
          value={grade}
          setValue={setGrade}
          reset
        />
        <Dropdown
          length="long"
          placeholder="전공"
          data={allMajorList}
          propertyName={{ key: 'imajor', value: 'majorName' }}
          value={imajor}
          setValue={setImajor}
          reset
          search
        />
        <Input
          length="middle"
          type="number"
          placeholder="학번"
          reset={setStudentNum}
          value={studentNum}
          setValue={e => setStudentNum(e.target.value)}
        />
        <Input
          length="short"
          type="text"
          placeholder="이름"
          reset={setNm}
          value={nm}
          setValue={e => setNm(e.target.value)}
        />
      </SearchBar>
      <ButtonBarLayout between>
        <div>
          {/* <Button onClick={() => handleExportExcel('student')}>엑셀 내보내기</Button> */}
          <Button
            onClick={() =>
              handleDownloadExcel('student', '학생 계정 등록', headerWidths, allMajorList)
            }
          >
            양식 다운로드
          </Button>
        </div>
        <div>
          <label htmlFor="file">일괄 계정 생성 (엑셀)</label>
          <input
            id="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={e =>
              handleUploadExcel(e, 'student', allMajorList, setExcelDataHasError, setExcelData)
            }
          />
          <Button onClick={() => navigate('/admin/user/create', { state: 'students' })}>
            계정 생성
          </Button>
        </div>
      </ButtonBarLayout>
      <Table
        header={tableHeader}
        data={studentsList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {studentsList?.map(item => {
          return (
            <div key={item.studentNum}>
              <div>{item.studentNum}</div>
              <div>{item.grade}</div>
              <div>{item.majorName}</div>
              <div>{item.nm}</div>
              <div>{(item.gender === 'M' && '남') || (item.gender === 'F' && '여')}</div>
              <div>{item.birthdate}</div>
              <div>{item.phone}</div>
              <div>{item.createdAt.slice(0, 4)}</div>
              <div>{(item.finishedYn === 1 && '재학 중') || (item.finishedYn === 2 && '졸업')}</div>
              <div>{item.score}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => navigate(`${item.studentNum}`, { state: 'students' })}
                ></CommonButton>
              </div>
            </div>
          );
        })}
      </Table>
      {excelData && (
        <ExcelData
          role="students"
          excelDataHeader={excelDataHeader}
          excelData={excelData}
          setExcelData={setExcelData}
          excelDataHasError={excelDataHasError}
          setExcelDataHasError={setExcelDataHasError}
          viewData={viewData}
          postData={postData}
        />
      )}
    </>
  );
};

export default Student;
