import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useQuerySearch from '../../hooks/useSearchFetch';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import { RootState } from '../../store';
import { ObjectType } from '../../types/components';
import { Button, ButtonBarLayout } from '../../styles/ButtonBarStyle';
import ExcelData from '../../components/ExcelData';
import { handleDownloadExcel, handleUploadExcel } from '../../modules/excel';

const Professor = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState<boolean>(false);
  const [imajor, setImajor] = useState<string | number | null>(null);
  const [name, setName] = useState<string>('');

  const [excelData, setExcelData] = useState<Array<ObjectType> | null>(null);
  const [excelDataHasError, setExcelDataHasError] = useState<boolean>(false);

  const { allMajorList } = useSelector((state: RootState) => state.major);

  const tableHeader = [
    { title: '전공', width: 5 },
    { title: '이름', width: 2 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 2.5 },
    { title: '전화번호', width: 3 },
    { title: '등록일', width: 2.5 },
    { title: '퇴직여부', width: 2 },
    { title: '상세보기', width: 2 },
  ];

  const queries = { imajor, name };
  const url = '/api/admin/professor';

  const { data, pending, error } = useQuerySearch(url, click);

  const professorList: Array<ObjectType> = (data as ObjectType)?.professors;

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
          length="short"
          type="text"
          placeholder="이름"
          reset={setName}
          value={name}
          setValue={e => setName(e.target.value)}
        />
      </SearchBar>
      <ButtonBarLayout>
        <Button
          onClick={() =>
            handleDownloadExcel('professor', '교수 계정 등록', headerWidths, allMajorList)
          }
        >
          양식 다운로드
        </Button>
        <label htmlFor="file">일괄 계정 생성 (엑셀)</label>
        <input
          id="file"
          type="file"
          accept=".xlsx, .xls"
          onChange={e =>
            handleUploadExcel(e, 'professor', allMajorList, setExcelDataHasError, setExcelData)
          }
        />
        <Button onClick={() => navigate('/admin/user/create', { state: 'professor' })}>
          계정 생성
        </Button>
      </ButtonBarLayout>
      <Table
        header={tableHeader}
        data={professorList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page.maxPage}
        pending={pending}
        error={error}
      >
        {professorList?.map(item => {
          return (
            <div key={item.iprofessor}>
              <div>{item.majorName}</div>
              <div>{item.nm}</div>
              <div>{item.gender === 'M' ? '남' : '여'}</div>
              <div>{item.birthdate}</div>
              <div>{item.phone}</div>
              <div>{item.createdAt}</div>
              <div>{item.delYn === 1 ? '퇴직' : '재직 중'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => navigate(`${item.iprofessor}`, { state: 'professor' })}
                ></CommonButton>
              </div>
            </div>
          );
        })}
      </Table>
      {excelData && (
        <ExcelData
          role="professor"
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

export default Professor;
