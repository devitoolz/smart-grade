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

import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import { read, utils } from 'xlsx';
import ExcelData from '../../components/ExcelData';

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

  const handleDownloadExcel = async () => {
    try {
      const wb = new Workbook();
      const ws = wb.addWorksheet('교수 계정 등록');
      const ws2 = wb.addWorksheet('전공', { state: 'hidden' });

      allMajorList.forEach((item, index) => {
        ws2.getCell('A' + (1 + index)).value = item.majorName;
      });

      const headerRow = ws.addRow([
        '이름',
        '성별',
        '생년월일(YYYYMMDD)',
        '전공',
        '휴대전화(010, - 제외 8자리)',
      ]);
      headerRow.height = 30;
      headerRow.eachCell((cell, colNum) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
        };
        cell.font = {
          bold: true,
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        ws.getColumn(colNum).width = headerWidths[colNum - 1];
      });

      //@ts-ignore
      ws.dataValidations.add('B2:B9999', {
        type: 'list',
        allowBlank: true,
        formulae: ['"남,여"'],
      });

      // @ts-ignore
      ws.dataValidations.add('D2:D9999', {
        type: 'list',
        allowBlank: true,
        formulae: [`전공!$A$1:$A$${allMajorList.length}`],
      });

      const fileData = await wb.xlsx.writeBuffer();
      const blob = new Blob([fileData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `교수 계정 등록 양식`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        if (!e.target) return;
        const data = reader.result;
        const fileInformation = read(data, {
          type: 'buffer',
        });
        const sheetName = fileInformation.SheetNames[0];
        const rawData = fileInformation.Sheets[sheetName];
        const result: Array<ObjectType> = utils.sheet_to_json(rawData);

        if (result.length === 0) {
          alert('생성할 계정이 없습니다.');
          e.target.value = '';
          return;
        }

        const newResult = result.map((item, index) => {
          return {
            index,
            nm: item['이름'],
            gender: (item['성별'] === '남' && 'M') || (item['성별'] === '여' && 'F'),
            birthdate: item['생년월일(YYYYMMDD)']
              .toString()
              .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            phone: '010'
              .concat(item['휴대전화(010, - 제외 8자리)'])
              .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            imajor: allMajorList.find(major => major.majorName === item['전공'])?.imajor,
            majorName: item['전공'],
          };
        });

        let nameHasError: Array<ObjectType> = [];

        newResult.forEach(item => {
          if (!/^[ㄱ-ㅎ가-힣a-zA-Z\s]+$/.test(item.nm)) {
            nameHasError.push({ index: item.index, nm: item.nm, error: '이름 오류' });
          }
          if (!['남', '여'].includes(item.gender as string)) {
            nameHasError.push({ index: item.index, nm: item.nm, error: '성별 오류' });
          }
          if (!/(\d{4})-(\d{2})-(\d{2})/.test(item.birthdate)) {
            nameHasError.push({ index: item.index, nm: item.nm, error: '생년월일 오류' });
          }
          if (!allMajorList.find(major => major.majorName === item.majorName)) {
            nameHasError.push({ index: item.index, nm: item.nm, error: '전공 오류' });
          }
          if (!/(\d{3})-(\d{4})-(\d{4})/.test(item.phone)) {
            nameHasError.push({ index: item.index, nm: item.nm, error: '휴대전화 오류' });
          }
        });

        if (nameHasError.length !== 0) {
          setExcelDataHasError(true);

          const output = Object.values(
            nameHasError.reduce((res, obj) => {
              if (!res[obj.nm]) {
                res[obj.nm] = { ...obj, error: [] };
              }
              res[obj.nm].error.push(obj.error);
              return res;
            }, {})
          );

          output.forEach(item => {
            item.error = item.error.join(', ');
          });

          const newOutput = newResult.map(result => {
            for (let i in output) {
              if (output[i].index === result.index) {
                return { ...result, ...output[i] };
              }
            }
            return result;
          });

          setExcelData(newOutput);
          e.target.value = '';
          return;
        }

        setExcelData(newResult);
        e.target.value = '';
      };
    }
  };

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
        <Button onClick={handleDownloadExcel}>양식 다운로드</Button>
        <label htmlFor="file">일괄 계정 생성 (엑셀)</label>
        <input id="file" type="file" accept=".xlsx, .xls" onChange={handleUploadExcel} />
        <Button onClick={() => navigate('/admin/user/create', { state: 'professor' })}>
          계정 생성
        </Button>
      </ButtonBarLayout>
      <Table
        header={tableHeader}
        data={professorList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page?.maxPage}
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
