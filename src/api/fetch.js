import axios from 'axios';

// 통합 강의 관리 - 강의리스트 불러오기
export const handleTestClick = async (_pageIdx, _setFunc, _setMaxPage) => {
  // try...catch
  try {
    const res = await axios.get(`/api/admin/lecture?page=${_pageIdx}`);
    const result = await res.data;
    // console.log('통신 데이터 : ', result);
    // console.log('max page : ', result.page.maxPage);
    _setFunc(result.lectures);
    _setMaxPage(result.page.maxPage);
    return result.lectures;
  } catch (error) {
    console.log(error);
    // 임시 더미 데이터
    return [
      {
        buildingNm: '백매관',
        currentPeople: 5,
        delYn: 0,
        endDate: '2023-06-30',
        endTime: '10:00:00',
        ilecture: 4,
        isemester: 21,
        lectureNm: '물리학1',
        lectureRoomNm: '503호',
        maxPeople: 27,
        nm: '김재경',
        procedures: 0,
        strDate: '2023-03-04',
        strTime: '09:00:00',
      },
    ];
  }
};

// 해당 강의 수강 학생 리스트 출력
export const getStudentList = async (_ilecture, _pageIdx) => {
  try {
    const res = await axios.get(`/api/admin/lecture/${_ilecture}?page=${_pageIdx}`);
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
    const res = await axios.get('/api/admin/lecture?procedures=-2');
    const result = await res.data;
    console.log('통신 데이터 : ', result);
    console.log('강의리스트 : ', result.lectures);
    // console.log('max page : ', result.page.maxPage);
    // const approvalList = [];
    // await result.lectures.forEach(item => {
    //   if (item.procedures !== 3 && item.procedures !== 0) approvalList.push(item);
    // });
    _setFunc(result.lectures);
    return result;
  } catch (error) {
    console.log(error);
    // 임시 더미 데이터
    return [
      {
        buildingNm: '백매관',
        currentPeople: 5,
        delYn: 0,
        endDate: '2023-06-30',
        endTime: '10:00:00',
        ilecture: 4,
        isemester: 21,
        lectureNm: '물리학1',
        lectureRoomNm: '503호',
        maxPeople: 27,
        nm: '김재경',
        procedures: 0,
        strDate: '2023-03-04',
        strTime: '09:00:00',
      },
    ];
  }
};
// 강의 개설+개강 요청 승인페이지 >> 거절사유 입력
export const patchRejectLecture = async (_ilecture, reason) => {
  console.log('개설 거절 사유 입력');
  console.log(_ilecture);
  console.log(reason);
  const headers = { 'Content-Type': 'application/json' };
  const patchData = {
    ilecture: _ilecture,
    ctnt: reason,
    procedures: 0,
  };
  try {
    const res = await axios.patch(`/api/admin/lecture`, patchData, { headers });
    const result = res.data;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
// 강의 개설+개강 요청 승인페이지 >> 승인
export const patchApproveLecture = async (_ilecture, _procedure) => {
  console.log('요청 승인');
  console.log(_ilecture);
  const headers = { 'Content-Type': 'application/json' };
  const patchData = {
    ilecture: _ilecture,
    procedures: _procedure + 1,
  };
  try {
    const res = await axios.patch(`/api/admin/lecture`, patchData, { headers });
    const result = res.data;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 통합 성적관리 - 특정 학생의 성적 검색
export const getStudentGrade = async _setFunc => {
  try {
    const res = await axios.get(`/api/admin/grade?studentNum=23100001`);
    const result = res.data;
    console.log(result.voList);
    await _setFunc(result.voList);
    return result;
  } catch (err) {
    console.log(err);
  }
};
// 통합 성적관리 - 특정 학생의 상세정보 불러오기
export const getStudentInfo = async (_istudent, _setFunc) => {
  try {
    const res = await axios.get(`/api/admin/grade/${_istudent}`);
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
    const res = await axios.post(`/api/board`, postData, { headers });
    const result = res.data;
    console.log(result);
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
    const res = await axios.get('/api/board/importanceList');
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
    await axios.delete(`/api/board/${_iboard}`);
    console.log('삭제 완');
  } catch (err) {
    console.log(err);
    return;
  }
};
