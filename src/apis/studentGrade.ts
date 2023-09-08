import api from './api';

// 학생 성적리스트 불러오기
export const getLectureList = async (setData: any) => {
  try {
    const { data } = await api.get('/api/student');
    setData(data);
    return true;
  } catch (err) {
    console.log(err);
    alert('데이터를 불러오는데 실패했습니다');
    return false;
  }
};

// 학생 이의신청하기
export const putObjection = async (objectionUrl: string) => {
  const headers = { 'Content-Type': 'application/json' };
  const putData = { objection: 1 };
  try {
    await api.put(objectionUrl, putData, { headers });
    alert('처리되었습니다');
    return true;
  } catch (err) {
    console.log(err);
    alert('이의 신청에 실패했습니다');
    return false;
  }
};
