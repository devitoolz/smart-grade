import { Workbook } from 'exceljs';
import { ObjectType } from '../types/components';
import { saveAs } from 'file-saver';
import React from 'react';
import { read, utils } from 'xlsx';

const handleDownloadExcel = async (
  role: 'professor' | 'student',
  sheetName: string,
  headerWidths: Array<number>,
  majorList: Array<ObjectType>
) => {
  try {
    const wb = new Workbook();
    const ws = wb.addWorksheet(sheetName);
    const ws2 = wb.addWorksheet('데이터', { state: 'hidden' });

    majorList.forEach((item, index) => {
      ws2.getCell('A' + (1 + index)).value = item.majorName;
    });
    ws2.getCell('B1').value = role;

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
      formulae: [`데이터!$A$1:$A$${majorList.length}`],
    });

    const fileData = await wb.xlsx.writeBuffer();
    const blob = new Blob([fileData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${sheetName} 양식`);
  } catch (error) {
    console.log(error);
  }
};

const handleUploadExcel = (
  e: React.ChangeEvent<HTMLInputElement>,
  role: 'professor' | 'student',
  majorList: Array<ObjectType>,
  errorHandler: React.Dispatch<React.SetStateAction<boolean>>,
  dataSetter: React.Dispatch<React.SetStateAction<ObjectType[] | null>>
) => {
  const file = (e.target.files as FileList)[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      if (!e.target) return;
      const data = reader.result;
      const file = read(data, {
        type: 'buffer',
      });
      const sheetName = file.SheetNames[0];
      const rawData = file.Sheets[sheetName];
      const result: Array<ObjectType> = utils.sheet_to_json(rawData);

      const roleData = file.Sheets[file.SheetNames[1]]?.['B1'].v;

      if (!roleData || roleData !== role) {
        alert('올바른 양식을 업로드 해주세요.');
        return;
      }

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
          imajor: majorList.find(major => major.majorName === item['전공'])?.imajor,
          majorName: item['전공'],
        };
      });

      let nameHasError: Array<ObjectType> = [];

      newResult.forEach(item => {
        if (!/^[ㄱ-ㅎ가-힣a-zA-Z\s]+$/.test(item.nm)) {
          nameHasError.push({ index: item.index, nm: item.nm, error: '이름 오류' });
        }
        if (!['M', 'F'].includes(item.gender as string)) {
          nameHasError.push({ index: item.index, nm: item.nm, error: '성별 오류' });
        }
        if (!/(\d{4})-(\d{2})-(\d{2})/.test(item.birthdate)) {
          nameHasError.push({ index: item.index, nm: item.nm, error: '생년월일 오류' });
        }
        if (!majorList.find(major => major.majorName === item.majorName)) {
          nameHasError.push({ index: item.index, nm: item.nm, error: '전공 오류' });
        }
        if (!/(\d{3})-(\d{4})-(\d{4})/.test(item.phone)) {
          nameHasError.push({ index: item.index, nm: item.nm, error: '휴대전화 오류' });
        }
      });

      if (nameHasError.length !== 0) {
        errorHandler(true);

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

        e.target.value = '';
        dataSetter(newOutput);
        return;
      }

      e.target.value = '';
      dataSetter(newResult);
    };
  }
};

export { handleDownloadExcel, handleUploadExcel };
