import React from 'react';
import api from './api';

// 학생 성적리스트 불러오기
export const getLectureList = async (setData: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const { data } = await api.get(`${process.env.REACT_APP_API_URL}/api/student`);
    setData(data);
    return true;
  } catch (err) {
    console.log(err);
    alert('데이터를 불러오는데 실패했습니다');
    return false;
  }
};

// 학생 이의신청하기
export const putObjection = async (
  objectionUrl: string,
  setData: React.Dispatch<React.SetStateAction<any>>
) => {
  const headers = { 'Content-Type': 'application/json' };
  const putData = { objection: 1 };
  try {
    await api.put(objectionUrl, putData, { headers });
    const { data } = await api.get(`${process.env.REACT_APP_API_URL}/api/student`);
    setData(data);
    alert('처리되었습니다');
    return true;
  } catch (err) {
    console.log(err);
    alert('이의 신청에 실패했습니다');
    return false;
  }
};

// 학생 성적 엑셀파일 다운로드
export const getGradeFile = async () => {
  try {
    const res = await api.get(`${process.env.REACT_APP_API_URL}/api/student/grade-file`, {
      responseType: 'blob',
    });

    let fileName = 'grade';
    const defaultFileName = res.headers['content-disposition'];
    if (defaultFileName) {
      fileName = defaultFileName.replace(/attachment;filename=/, '');
    }

    const url = URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url); //메모리 누수 방지

    return true;
  } catch (err) {
    console.log(err);
    alert('다운로드에 실패했습니다');
    return false;
  }
};
