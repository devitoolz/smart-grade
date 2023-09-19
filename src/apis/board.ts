import api from './api';

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
    const res = await api.post(`${process.env.REACT_APP_API_URL}/api/board/pics`, postData, {
      headers,
    });
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
    await api.delete(`${process.env.REACT_APP_API_URL}/api/board?iboard=${_iboard}`);
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
  _importance: number,
  _ipic: Array<number>,
  _putPic: Array<File>
) => {
  const headers = { 'Content-Type': 'multipart/form-data' };
  const putData = new FormData();
  const param = {
    iboard: _iboard,
    ctnt: _ctnt,
    title: _title,
    importance: _importance,
    iadmin: 1,
    ipic: _ipic,
  };
  putData.append(
    'param',
    new Blob([JSON.stringify(param)], {
      type: 'application/json',
    })
  );
  _putPic?.forEach(item => putData.append('pics', item));
  try {
    await api.put(`${process.env.REACT_APP_API_URL}/api/board`, putData, { headers });
    alert('처리되었습니다');
    return true;
  } catch (err) {
    console.log(err);
    alert('게시글 작성을 실패했습니다');
    return false;
  }
};
