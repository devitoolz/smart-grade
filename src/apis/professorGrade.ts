import api from './api';

// 교수가 강의 중인 과목리스트 불러오기
export const getLectureList = async () => {
  const url = `/api/professor/lecture-list?openingProcedures=3`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터를 불러오는데 실패했습니다');
  }
};

// 해당 과목 성적 입력
export const putStudentGrade = async (
  ilectureStudent: number,
  ilecture: number,
  attendance: number,
  midtermExamination: number,
  finalExamination: number
) => {
  const url = `/api/professor/grade?ilectureStudent=${ilectureStudent}&ilecture=${ilecture}`;
  const putData = {
    attendance,
    midtermExamination,
    finalExamination,
  };
  try {
    await api.put(url, putData);
    alert('성적 입력이 완료되었습니다');
    return true;
  } catch (err) {
    console.log(err);
    alert('성적 입력에 실패했습니다');
    return false;
  }
};

// 과목별 이의신청 리스트 출력
export const getObjectionList = async (lectureId: any, _setFunc: any) => {
  const url = `/api/professor/objection?ilecture=${lectureId}&objection=1`;
  try {
    const { data } = await api.get(url);
    _setFunc(data);
    return true;
  } catch (err) {
    console.log(err);
    alert('데이터를 불러오는데 실패했습니다');
    return false;
  }
};
// 학생 이의신청 수리
export const putObjection = async (url: string) => {
  try {
    await api.put(url);
    alert('성공했습니다');
    return true;
  } catch (err) {
    console.log(err);
    alert('실패했습니다');
    return false;
  }
};
