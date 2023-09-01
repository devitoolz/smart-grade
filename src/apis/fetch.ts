import api from './api';

// 통합 강의 관리 - 해당 강의 수강 학생 리스트 출력
export const getStudentList = async (_ilecture: number, _pageIdx?: number) => {
  try {
    const res = await api.get(`/api/admin/lecture/${_ilecture}`);
    const result = res.data;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 강의 개설+개강 요청 승인페이지 >> 거절사유 입력
export const patchRejectLecture = async (_ilecture: number, reason: string) => {
  const headers = { 'Content-Type': 'application/json' };
  const patchData = {
    ilecture: _ilecture,
    ctnt: reason,
    procedures: 0,
  };
  try {
    const res = await api.patch(`/api/admin/lecture`, patchData, { headers });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
// 강의 개설+개강 요청 승인페이지 >> 승인
export const patchApproveLecture = async (_ilecture: number, _procedure: number) => {
  const headers = { 'Content-Type': 'application/json' };
  const patchData = {
    ilecture: _ilecture,
    procedures: _procedure + 1,
  };
  try {
    const res = await api.patch(`/api/admin/lecture`, patchData, { headers });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 통합 성적관리 - 특정 학생의 상세정보 불러오기
export const getStudentInfo = async (_istudent: number, _setFunc: any) => {
  try {
    const res = await api.get(`/api/admin/grade-mngmn/${_istudent}`);
    const result = await res.data;
    _setFunc(result);
  } catch (err) {
    console.log(err);
  }
};

// 게시판 - 게시판 글 올리기
export const postBoard = async (
  _title: string,
  _contents: string,
  _isChecked: number,
  _pics?: Array<File>
) => {
  const headers = { 'Content-Type': 'multipart/form-data' };
  const postData = new FormData();
  const param = {
    iadmin: 1,
    ctnt: _contents,
    title: _title,
    importance: _isChecked,
  };
  // const pics = [];
  // postData.append("pics", fileRef.current.files[0]);
  _pics?.forEach(item => postData.append('pics', item));
  postData.append(
    'param',
    new Blob([JSON.stringify(param)], {
      type: 'application/json',
    })
  );
  try {
    const res = await api.post(`/api/board/pics`, postData, { headers });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
    alert('에러가 발생했습니다');
    return;
  }
};
// 게시판 - 게시판 글 삭제
export const deleteBoard = async (_iboard: number) => {
  try {
    await api.delete(`/api/board?iboard=${_iboard}`);
  } catch (err) {
    console.log(err);
    return;
  }
};
// 게시판 - 게시글 수정
export const putBoard = async (
  _iboard: number,
  _ctnt: string,
  _title: string,
  _importance: number
) => {
  const headers = { 'Content-Type': 'application/json' };
  const putData = {
    iboard: _iboard,
    ctnt: _ctnt,
    title: _title,
    importance: _importance,
  };
  try {
    await api.put(`/api/board`, putData, { headers });
    alert('처리되었습니다');
  } catch (err) {
    console.log(err);
    alert('에러가 발생했습니다');
    return;
  }
};

/* * * * * 교수페이지 * * * * */
export const putStudentGrade = async () => {
  //
};
