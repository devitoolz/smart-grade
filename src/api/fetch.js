import api from './api';

// 통합 강의 관리 - 강의리스트 불러오기
export const handleTestClick = async (_pageIdx, _setFunc, _setMaxPage) => {
  // try...catch
  try {
    const res = await api.get(`/api/admin/lecture?page=${_pageIdx}`);
    const result = await res.data;
    // console.log('통신 데이터 : ', result);
    // console.log('max page : ', result.page.maxPage);
    _setFunc(result.lectures);
    _setMaxPage(result.page.maxPage);
    return result.lectures;
  } catch (error) {
    console.log(error);
    return;
  }
};

// 해당 강의 수강 학생 리스트 출력
export const getStudentList = async (_ilecture, _pageIdx) => {
  try {
    const res = await api.get(`/api/admin/lecture/${_ilecture}?page=${_pageIdx}`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 강의 개설+개강 요청 승인페이지
export const handleGetApprovalLecture = async _setFunc => {
  // try...catch
  try {
    const res = await api.get('/api/admin/lecture?procedures=-2');
    const result = await res.data;
    _setFunc(result.lectures);
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 강의 개설+개강 요청 승인페이지 >> 거절사유 입력
export const patchRejectLecture = async (_ilecture, reason) => {
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
export const patchApproveLecture = async (_ilecture, _procedure) => {
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

// 통합 성적관리 - 특정 학생의 성적 검색
export const getStudentGrade = async _setFunc => {
  try {
    const res = await api.get(`/api/admin/grade?studentNum=23100001`);
    const result = await res.data;
    await _setFunc(result.voList);
    return result;
  } catch (err) {
    console.log(err);
  }
};
// 통합 성적관리 - 특정 학생의 상세정보 불러오기
export const getStudentInfo = async (_istudent, _setFunc) => {
  try {
    const res = await api.get(`/api/admin/grade/${_istudent}`);
    const result = await res.data;
    _setFunc(result);
  } catch (err) {
    console.log(err);
  }
};

// 게시판 - 게시판 글 올리기
export const postBoard = async (_title, _contents, _isChecked) => {
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
  postData.append(
    'param',
    new Blob([JSON.stringify(param)], {
      type: 'application/json',
    })
  );
  try {
    const res = await api.post(`/api/board`, postData, { headers });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
    alert('에러가 발생했습니다');
    return;
  }
};
// 게시판 - 중요 공지사항 불러오기
export const getImportantBoard = async _setFunc => {
  try {
    const res = await api.get('/api/board/importanceList');
    const result = await res.data;
    _setFunc(result);
  } catch (err) {
    console.log(err);
    return;
  }
};
// 게시판 - 게시판 글 삭제
export const deleteBoard = async _iboard => {
  try {
    await api.delete(`/api/board/${_iboard}`);
  } catch (err) {
    console.log(err);
    return;
  }
};
// 게시판 - 게시글 수정
export const putBoard = async (_iboard, _ctnt, _title, _importance) => {
  const headers = { 'Content-Type': 'application/json' };
  const putData = {
    iboard: _iboard,
    ctnt: _ctnt,
    title: _title,
    importance: _importance,
  };
  try {
    await api.put(`/api/board`, putData, { headers });
  } catch (err) {
    console.log(err);
    return;
  }
};
