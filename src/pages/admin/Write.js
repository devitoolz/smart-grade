import React, { useState } from 'react';
import { Ltable } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import { Layout } from '../../styles/CommonStyle';
import Table from '../../components/Table';
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

  return (
    <Ltable>
      <colgroup>
        <col className="title" width={'30%'} />
        <col className="detail" width={'70%'} />
      </colgroup>

      <th>제목</th>
      <th className="inputTitle">
        <Input type="text" length="full" maxLength={20} value={title} setValue={handleTitle} />
      </th>
      <tr>
        <td className="statusTitle">
          <strong>상태</strong>
        </td>
        <td className="importanceCheck">
          <input type="checkbox" value="1" />
          <p>
            <strong>중요</strong>
          </p>
          <p>* 체크 시 제일 상단 공지로 표시됩니다.</p>
        </td>
      </tr>
      <tr>
        <td className="fileTitle">첨부파일</td>
        <td></td>
      </tr>
      <tr>
        <td className="contentTitle">
          <strong>내용</strong>
        </td>
        <td className='controlTextarea'>
          <textarea name="content" id="content" cols="80" rows="20"></textarea>
        </td>
      </tr>
    </Ltable>
  );
};

export default Write;
