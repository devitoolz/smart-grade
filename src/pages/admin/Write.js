import React, { useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import { Layout } from '../../styles/CommonStyle';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
const Write = () => {
  //공지사항  제목
  const [title, setTitle] = useState('');

  //공지사항 체크박스 value
  const [check, setCheck] = useState(false);

  //checkbox value chang 함수
  const handleChangvalue = () => {
    setCheck(false);
  };

  //제목 인풋창?
  const handleTitle = e => {
    setTitle(e.target.title);
  };
  //임시
  const gogo = () => {
    console.log(gogo);
  };
  return (
    <>
      <Ltable>
        <colgroup>
          <col className="title" width={'30%'} />
          <col className="detail" width={'70%'} />
        </colgroup>
        <thead>
          <th>
            <h3>제목</h3>
          </th>
          <th className="inputTitle">
            <Input type="text" length="full" maxLength={20} value={title} setValue={handleTitle} />
          </th>
        </thead>
        <tbody>
          <tr>
            <td className="statusTitle">
              <h3>상태</h3>
            </td>
            <td className="importanceCheck">
              <input type="checkbox" value="1" />
              <div>
                <h3>중요</h3>
              </div>
              <p className="colorRed">* 체크 시 제일 상단 공지로 표시됩니다.</p>
            </td>
          </tr>
          <tr>
            <td className="fileTitle">
              <h3>첨부파일</h3>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="contentTitle">
              <h3>내용</h3>
            </td>
            <td className="controlTextarea">
              <textarea name="content" id="content" cols="80" rows="20"></textarea>
            </td>
          </tr>
        </tbody>
      </Ltable>
      <Wbtns>
        <CommonButton btnType="page" value="수정" onClick={gogo}></CommonButton>
        <CommonButton btnType="page" value="삭제" onClick={gogo}></CommonButton>
      </Wbtns>
    </>
  );
};

export default Write;
